import os
from fastapi import FastAPI, HTTPException, Security, UploadFile, File, Form
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv

from core.processing import process_document_and_questions

load_dotenv()
app = FastAPI(title="Intelligent Query-Retrieval System")

# --- CORS Middleware Setup ---
# Next.js frontend communication with the backend
origins = [
    "http://localhost:9002",  # For local development
    # deployed frontend URL here later, e.g., "https://your-app.vercel.app"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Authentication ---
security = HTTPBearer()
EXPECTED_BEARER_TOKEN = os.getenv("BEARER_TOKEN")

def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    if not credentials or credentials.scheme != "Bearer" or credentials.credentials != EXPECTED_BEARER_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid auth token")

# --- API Models ---
class QueryResponse(BaseModel):
    answers: List[str]

# --- API Endpoints ---
@app.post("/hackrx/run", response_model=QueryResponse)
async def run_query_pipeline(
    questions: List[str] = Form(...),
    file: Optional[UploadFile] = File(None),
    documents: Optional[str] = Form(None),
    token: str = Security(verify_token)
):
    if not file and not documents:
        raise HTTPException(status_code=400, detail="Either a file upload or a document URL must be provided.")

    if file:
        file_content = await file.read()
        answers = await process_document_and_questions(questions=questions, file_content=file_content)
    else:
        answers = await process_document_and_questions(questions=questions, doc_url=documents)
        
    return QueryResponse(answers=answers)

@app.get("/")
async def read_root():
    return {"status": "ok"}