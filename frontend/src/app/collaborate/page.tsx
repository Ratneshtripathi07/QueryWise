'use client';

import { Sparkles, ArrowLeft, Github, Users, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

export default function CollaboratePage() {
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

      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        <header className="text-center my-20">
          <div className="inline-block p-6 bg-primary/10 rounded-full mb-8 animate-pulse-glow">
            <Users className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-6xl sm:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 mb-8">
            Collaborate With Us
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Join us in our mission to revolutionize document querying with AI.
          </p>
        </header>

        {/* GitHub Section */}
        <div className="text-center mb-20 mt-32">
          {/* Mona and GITHUB aligned together */}
          <div className="flex flex-col items-center justify-center mb-16">
            {/* Mona the GitHub Cat Animation */}
            <div className="mb-8">
              <div className="relative">
                {/* Mona Cat SVG */}
                <svg 
                  className="w-32 h-32 animate-bounce text-primary" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                
                {/* Animated ears */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                
                {/* Animated whiskers */}
                <div className="absolute top-1/2 -left-8 w-6 h-0.5 bg-primary transform -rotate-12 animate-pulse"></div>
                <div className="absolute top-1/2 -left-8 w-6 h-0.5 bg-primary transform rotate-12 animate-pulse" style={{animationDelay: '0.3s'}}></div>
                <div className="absolute top-1/2 -right-8 w-6 h-0.5 bg-primary transform rotate-12 animate-pulse"></div>
                <div className="absolute top-1/2 -right-8 w-6 h-0.5 bg-primary transform -rotate-12 animate-pulse" style={{animationDelay: '0.3s'}}></div>
              </div>
            </div>
            
            {/* GITHUB Text - Biggest on screen and clickable */}
            <div className="bg-card/90 rounded-3xl shadow-xl border border-border/20 px-10 py-8 sm:px-16 sm:py-12 mb-4 flex flex-col items-center justify-center max-w-2xl mx-auto">
              <a
                href="https://github.com/team-innov8/querywise"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <h2 className="text-7xl sm:text-8xl font-black text-primary tracking-wider cursor-pointer mb-2">
                  GITHUB
                </h2>
              </a>
              <p className="text-muted-foreground text-lg sm:text-xl mt-2">
                Star, fork, or contribute to QueryWise on GitHub and join our open source journey!
              </p>
            </div>
          </div>

          {/* GitHub Container with proper rounded corners */}
          {/* <div className="bg-card/80 backdrop-blur-md border border-border/20 shadow-2xl shadow-primary/10 max-w-4xl mx-auto rounded-3xl overflow-hidden">
            <div className="p-12">
              <h3 className="text-3xl font-bold mb-6">Open Source Collaboration</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We believe in the power of open source and community-driven development. 
                Join us on GitHub to contribute, report issues, suggest features, or simply 
                explore our codebase.
              </p>
            </div>
          </div> */}
        </div>

        {/* Contact Section */}
        <div className="text-center mb-20">
          <Card className="bg-card/60 backdrop-blur-md border-border/20 shadow-xl shadow-primary/5 max-w-2xl mx-auto">
            <CardContent className="p-12">
              <h3 className="text-4xl font-bold mb-6">Wanna work with us?</h3>
              <p className="text-muted-foreground text-lg mb-8">
                Ready to collaborate? Have a project in mind? Let's discuss how we can work together 
                to create something amazing.
              </p>
              <Button asChild size="lg" className="gap-3 text-lg py-6 px-8">
                <Link href="/contact">
                  <Mail className="h-6 w-6" />
                  Contact Us
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <footer className="text-center text-muted-foreground">
          <p className="text-lg">Built with ❤️ by team Innov8</p>
        </footer>
      </main>
      
      <div className="absolute inset-0 z-0 opacity-20 dark:bg-galaxy" style={{filter: 'blur(100px)'}}></div>
    </div>
  )
}
