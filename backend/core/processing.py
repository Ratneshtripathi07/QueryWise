import os
import re
import tempfile
import hashlib
import httpx
import asyncio
import logging
from typing import List, Optional
from dotenv import load_dotenv
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import JinaEmbeddings
from langchain.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

# --- Setup ---
INDEX_DIR = "persistent_indexes"
if not os.path.exists(INDEX_DIR):
    os.makedirs(INDEX_DIR)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- Initialize Clients ---
embeddings_client = JinaEmbeddings(
    jina_api_key=os.getenv("JINA_API_KEY"),
    model_name="jina-embeddings-v2-base-en"
)
llm_client = ChatGoogleGenerativeAI(model="models/gemini-2.0-flash-lite", temperature=0)

# --- Helper Function for Google Drive ---
def transform_google_drive_url(url: str) -> str:
    """Transforms a Google Drive sharing URL into a direct download link."""
    match = re.search(r'/file/d/([^/]+)', url)
    if match:
        file_id = match.group(1)
        return f'https://drive.google.com/uc?export=download&id={file_id}'
    else:
        raise ValueError("Invalid Google Drive URL format. Could not extract file ID.")

# --- Main Processing Function ---
async def process_document_and_questions(questions: List[str], doc_url: Optional[str] = None, file_content: Optional[bytes] = None) -> List[str]:
    try:
        if not doc_url and not file_content:
            raise ValueError("Either doc_url or file_content must be provided")

        # Determine the source and create a unique hash for caching
        if file_content:
            logger.info("Processing uploaded file content")
            content_hash = hashlib.sha256(file_content).hexdigest()
            index_path = os.path.join(INDEX_DIR, f"faiss_jina_file_{content_hash}")
        else: # doc_url must be present
            logger.info(f"Processing request for document URL: {doc_url}")
            url_hash = hashlib.sha256(doc_url.encode()).hexdigest()
            index_path = os.path.join(INDEX_DIR, f"faiss_jina_{url_hash}")
            
        vector_store = None

        if os.path.exists(index_path):
            logger.info(f"Loading existing FAISS index from: {index_path}")
            loop = asyncio.get_running_loop()
            vector_store = await loop.run_in_executor(
                None, lambda: FAISS.load_local(index_path, embeddings_client, allow_dangerous_deserialization=True)
            )
        else:
            logger.info(f"No index found. Creating new one at: {index_path}")
            pdf_content = file_content
            if not pdf_content:
                download_url = doc_url
                if "drive.google.com" in doc_url:
                    try:
                        download_url = transform_google_drive_url(doc_url)
                        logger.info(f"Transformed Google Drive URL to: {download_url}")
                    except ValueError as e:
                        raise Exception(str(e))
                
                async with httpx.AsyncClient(timeout=60.0) as client:
                    response = await client.get(download_url, follow_redirects=True)
                    response.raise_for_status()
                    
                    pdf_content = response.content
                    
                    # --- MODIFIED: More Robust Validation Logic ---
                    content_type = response.headers.get("content-type", "").lower()
                    
                    is_pdf_by_content = pdf_content.startswith(b'%PDF')
                    is_pdf_by_header = "application/pdf" in content_type
                    is_generic_binary_header = "application/octet-stream" in content_type

                    # The content must either start with PDF magic bytes OR have a PDF/generic header
                    if not (is_pdf_by_content or is_pdf_by_header or is_generic_binary_header):
                        raise Exception("The URL did not return a valid PDF. Please check the link and permissions.")
                    
                    logger.info("PDF content validated successfully.")
                    # --- END OF MODIFICATION ---

            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
                tmp_file.write(pdf_content)
                tmp_file_path = tmp_file.name
            
            try:
                loader = PyMuPDFLoader(tmp_file_path)
                documents = loader.load()
                
                text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
                chunks = text_splitter.split_documents(documents)
                
                logger.info(f"Building FAISS index for {len(chunks)} chunks using Jina API...")
                loop = asyncio.get_running_loop()
                vector_store = await loop.run_in_executor(
                    None, lambda: FAISS.from_documents(chunks, embeddings_client)
                )
                
                await loop.run_in_executor(None, lambda: vector_store.save_local(index_path))
                logger.info(f"Saved new index to disk: {index_path}")
            finally:
                os.remove(tmp_file_path)

        # --- RAG Setup ---
        retriever = vector_store.as_retriever(search_kwargs={"k": 7})
        prompt_template = """
        You are an expert AI data extractor. Answer with precision based ONLY on the provided context.
        INSTRUCTIONS:
        - Use bullet points for multiple parts.
        - For a single value, provide only that value.
        - Be direct. No introductory phrases.
        CONTEXT:
        {context}
        QUESTION:
        {question}
        PRECISE ANSWER:
        """
        prompt = PromptTemplate.from_template(prompt_template)
        rag_chain = ({"context": retriever, "question": RunnablePassthrough()} | prompt | llm_client | StrOutputParser())

        # --- Process Questions Concurrently ---
        async def process_single_question(question: str) -> str:
            try:
                return (await rag_chain.ainvoke(question)).strip()
            except Exception as e:
                logger.error(f"Error for question '{question[:50]}...': {e}")
                return "Error processing this question."

        tasks = [process_single_question(q) for q in questions]
        return await asyncio.gather(*tasks)
        
    except Exception as e:
        logger.error(f"A critical error occurred: {e}", exc_info=True)
        return [f"A critical error occurred: {str(e)}"] * len(questions)





