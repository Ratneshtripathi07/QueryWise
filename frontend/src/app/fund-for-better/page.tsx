
import { Sparkles, ArrowLeft, HeartHandshake } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function FundForBetterPage() {
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
            Fund For Better
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">Support our mission to make intelligent document understanding accessible to everyone.</p>
        </header>

        <div className="w-full bg-card/80 backdrop-blur-md border-border/20 shadow-2xl shadow-primary/10 rounded-lg p-8">
            <div className="flex items-start gap-4">
              <HeartHandshake className="h-8 w-8 text-primary mt-1" />
              <div className="space-y-4">
                <p className="text-base text-muted-foreground">
                  Your contribution helps us improve QueryWise—enhancing performance, expanding features, and supporting more languages and document types.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <a href="https://buymeacoffee.com/rgtdevs" target="_blank" rel="noreferrer">
                      Donate
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="/contact">Contact Us</a>
                  </Button>
                </div>
              </div>
            </div>
        </div>
        
        <footer className="text-center mt-16 text-muted-foreground">
          <p>Built with ❤️ team Innov8</p>
        </footer>
      </main>
      
      <div className="absolute inset-0 z-0 opacity-20 dark:bg-galaxy" style={{filter: 'blur(100px)'}}></div>
    </div>
  )
}
 


