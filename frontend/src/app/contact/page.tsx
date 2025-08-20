'use client';

import { Users, Github, Linkedin, Instagram, Mail, Code, Palette, Database } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';

export default function ContactPage() {
  const teamMembers = [
    {
      name: 'RGT',
      role: 'Lead Developer',
      icon: Code,
      github: 'https://github.com/ratneshtripathi07',
      linkedin: 'https://linkedin.com/in/rgt01',
      email: 'rgtworkj25@gmail.com',
      instagram: 'https://instagram.com/ratnesh___tripathi'
    },
    {
      name: 'Abhi',
      role: 'Frontend Specialist',
      icon: Palette,
      github: 'https://github.com/abhii1429',
      linkedin: 'https://linkedin.com/in/abhishek-pandey07',
      email: 'hopesaliveabhi2003@gmail.com',
      instagram: 'https://instagram.com/'
    },
    {
      name: 'Rolex',
      role: 'Backend Engineer',
      icon: Database,
      github: 'https://github.com/ikrishanaa',
      linkedin: 'https://linkedin.com/in/ikrishanaa',
      email: 'krishanaindia773@gmail.com',
      instagram: 'https://instagram.com/ikrishanaa'
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden">
      <div className="absolute top-4 left-4 z-20">
        <Button asChild variant="ghost" size="icon">
          <Link href="/">
            <Users className="h-6 w-6" />
          </Link>
        </Button>
      </div>
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        <header className="text-center my-20">
          <div className="inline-block p-6 bg-primary/10 rounded-full mb-8 animate-pulse-glow">
            <Users className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-6xl sm:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 mb-6">
            Contact Us
          </h1>
          <div className="mb-8">
            <h2 className="text-7xl sm:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 mb-6">TEAM INNOV8</h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              Meet the brilliant minds behind QueryWise. We're passionate about innovation and here to help you succeed.
            </p>
          </div>
        </header>

        {/* Team Profile Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {teamMembers.map((member, index) => {
            const IconComponent = member.icon;
            return (
              <Card key={index} className="bg-card/80 backdrop-blur-md border-border/20 shadow-2xl shadow-primary/10 hover:shadow-primary/30 transition-all duration-500 hover:scale-105">
                <CardContent className="p-12 text-center">
                  <div className="inline-block p-8 bg-primary/10 rounded-full mb-8">
                    <IconComponent className="h-16 w-16 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{member.name}</h3>
                  <p className="text-muted-foreground text-lg mb-10">{member.role}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button asChild variant="outline" size="lg" className="gap-3 h-12">
                      <a href={member.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5" />
                        GitHub
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="gap-3 h-12">
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-5 w-5" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="gap-3 h-12">
                      <a href={`mailto:${member.email}`}>
                        <Mail className="h-5 w-5" />
                        Mail
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="gap-3 h-12">
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-5 w-5" />
                        Instagram
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Contact Info */}
        {/* 
                <div className="text-center mb-20">
          <Card className="bg-card/60 backdrop-blur-md border-border/20 shadow-xl shadow-primary/5 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Need to reach the whole team?</h3>
              <p className="text-muted-foreground mb-6">
                For general inquiries, feedback, or collaboration opportunities, use our feedback form.
              </p>
              <Button asChild size="lg" className="gap-3">
                <Link href="/feedback">
                  <Mail className="h-5 w-5" />
                  Send Feedback
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        */}
        
        <footer className="text-center text-muted-foreground">
          <p className="text-lg">Built with ❤️ by team Innov8</p>
        </footer>
      </main>
      
      <div className="absolute inset-0 z-0 opacity-20 dark:bg-galaxy" style={{filter: 'blur(100px)'}}></div>
    </div>
  );
}
