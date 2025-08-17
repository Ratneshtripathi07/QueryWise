
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const faqs = [
    {
        question: "What kind of documents can I use?",
        answer: "Currently, the system is optimized for any publicly accessible PDF document. Just paste the URL and our system will handle the rest."
    },
    {
        question: "Is my data secure?",
        answer: "Yes. Documents are processed in a secure, containerized environment. For our persistent cache, we store a numerical vector index, not the original document text in a directly readable format, ensuring your data's privacy."
    },
    {
        question: "Why is the first request for a new document slower than the next ones?",
        answer: "The very first time we see a new document, our AI performs a one-time, heavy analysis to read, chunk, and create a searchable index. This indexing process is what makes all future queries for that same document almost instantaneous."
    },
    {
        question: "What AI models are used in this project?",
        answer: "We use a state-of-the-art hybrid architecture. A local BAAI/bge-base-en-v1.5 model is used for high-quality semantic search, and Google's Gemini models are used for the final, precise answer generation."
    },
    {
        question: "How many questions can I ask at once?",
        answer: "You can ask as many questions as you like by placing each on a new line in the input box. Our system is built to process them all concurrently for maximum speed."
    },
    {
        question: "What does it mean if I get an error?",
        answer: "An error might occur if the document URL is invalid, the PDF is corrupted, or if an external AI service is temporarily unavailable. Please double-check the URL and try again."
    }
]

export default function FaqPage() {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden">
       <div className="absolute top-4 left-4 z-20">
        <Button asChild variant="ghost" size="icon">
          <Link href="/">
              <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
      </div>
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        <header className="text-center my-16">
           <div className="inline-block p-4 bg-primary/10 rounded-full mb-6 animate-pulse-glow">
            <Sparkles className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            Frequently Asked Questions
          </h1>
        </header>

        <div className="w-full bg-card/80 backdrop-blur-md border-border/20 shadow-2xl shadow-primary/10 rounded-lg p-8">
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-lg text-left hover:no-underline">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
        
        <footer className="text-center mt-16 text-muted-foreground">
          <p>Built with ❤️ by team Innov8</p>
        </footer>
      </main>
      
      <div className="absolute inset-0 z-0 opacity-20 dark:bg-galaxy" style={{filter: 'blur(100px)'}}></div>
    </div>
  )
}
