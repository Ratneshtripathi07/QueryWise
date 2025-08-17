//--------------------------------------------------------------------------------
//                                  version 1.1
//--------------------------------------------------------------------------------

// src/app/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle, Sparkles, FileText, Search, Menu, Info, Mail, Users, Upload, Link2, HeartHandshake, MessageSquare } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Result = {
  question: string;
  answer: string;
};

export default function Home() {
  const [inputType, setInputType] = useState('url');
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [questions, setQuestions] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- THIS IS THE UPDATED LOGIC ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);

    const questionList = questions.split('\n').filter(q => q.trim() !== '');

    if (questionList.length === 0) {
        setError('Please provide at least one question.');
        setLoading(false);
        return;
    }

    if (inputType === 'url' && !pdfUrl.trim()) {
        setError('Please provide a PDF URL.');
        setLoading(false);
        return;
    }

    if (inputType === 'file' && !pdfFile) {
        setError('Please upload a PDF file.');
        setLoading(false);
        return;
    }

    const formData = new FormData();
    questionList.forEach(q => formData.append('questions', q));

    if (inputType === 'file' && pdfFile) {
        formData.append('file', pdfFile);
    } else {
        formData.append('documents', pdfUrl);
    }
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

      if (!apiUrl || !apiToken) {
        throw new Error('API URL or Token is not configured in environment variables.');
      }
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          // For FormData, the browser sets the 'Content-Type' header automatically.
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle both 202 "Processing" and other errors from our backend
        throw new Error(data.detail || `API request failed with status ${response.status}`);
      }

      if (!data.answers || !Array.isArray(data.answers)) {
        throw new Error('Invalid response format from API. Expected an "answers" array.');
      }
      
      const newResults: Result[] = questionList.map((question, index) => ({
        question,
        answer: data.answers[index] || 'No answer provided for this question.',
      }));

      setResults(newResults);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  // --- END OF UPDATED LOGIC ---
  
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden">
      {/* --- ALL YOUR BEAUTIFUL UI IS UNCHANGED BELOW --- */}
      <div className="absolute top-4 left-4 z-20">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 pt-8">
              <a href="/faq" className="flex items-center gap-3 p-2 rounded-md hover:bg-accent">
                <Info className="h-5 w-5" />
                <span>FAQ</span>
              </a>
              <a href="/contact" className="flex items-center gap-3 p-2 rounded-md hover:bg-accent">
                <Mail className="h-5 w-5" />
                <span>Contact</span>
              </a>
              <a href="/collaborate" className="flex items-center gap-3 p-2 rounded-md hover:bg-accent">
                <Users className="h-5 w-5" />
                <span>Collaborate</span>
              </a>
              <a href="/fund-for-better" className="flex items-center gap-3 p-2 rounded-md hover:bg-accent">
                <HeartHandshake className="h-5 w-5" />
                <span>Fund For Better</span>
              </a>
              {/* <a href="/feedback" className="flex items-center gap-3 p-2 rounded-md hover:bg-accent">
                <MessageSquare className="h-5 w-5" />
                <span>Feedback</span>
              </a> */}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        <header className="text-center my-16">
           <div className="inline-block p-4 bg-primary/10 rounded-full mb-6 animate-pulse-glow">
           <Sparkles className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 px-4 py-3 border-b-4 rounded-t-lg">
            QueryWise
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">Your Intelligent Document Query System. Paste a PDF link or upload a file and ask questions to get instant, AI-powered answers.</p>
        </header>

        <Card className="w-full bg-card/80 backdrop-blur-md border-border/20 shadow-2xl shadow-primary/10">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <Tabs value={inputType} onValueChange={setInputType} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="url" className="gap-2"><Link2 className="h-5 w-5"/> PDF Link</TabsTrigger>
                  <TabsTrigger value="file" className="gap-2"><Upload className="h-5 w-5"/> Upload PDF</TabsTrigger>
                </TabsList>
                <TabsContent value="url" className="pt-6">
                  <div className="space-y-3">
                    <label htmlFor="pdf-url" className="text-lg font-semibold flex items-center gap-3">
                      <FileText className="h-6 w-6 text-primary" />
                      PDF Document URL
                    </label>
                    <Input
                      id="pdf-url"
                      type="url"
                      placeholder="https://example.com/document.pdf"
                      value={pdfUrl}
                      onChange={(e) => setPdfUrl(e.target.value)}
                      disabled={loading}
                      className="bg-input/50 border-border/80 h-12 text-base focus:ring-primary focus:border-primary"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="file" className="pt-6">
                  <div className="space-y-3">
                    <label htmlFor="pdf-file" className="text-lg font-semibold flex items-center gap-3">
                      <Upload className="h-6 w-6 text-primary" />
                      Upload PDF File
                    </label>
                    <Input
                      id="pdf-file"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setPdfFile(e.target.files ? e.target.files[0] : null)}
                      disabled={loading}
                      className="bg-input/50 border-border/80 h-12 text-base focus:ring-primary focus:border-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="space-y-3">
                <label htmlFor="questions" className="text-lg font-semibold flex items-center gap-3">
                  <Search className="h-6 w-6 text-primary" />
                  Your Questions
                </label>
                <Textarea
                  id="questions"
                  placeholder="Enter your questions, one per line..."
                  value={questions}
                  onChange={(e) => setQuestions(e.target.value)}
                  required
                  rows={5}
                  disabled={loading}
                  className="resize-y bg-input/50 border-border/80 text-base focus:ring-primary focus:border-primary"
                />
              </div>
              <Button 
                type="submit" 
                size="lg"
                className="w-full text-lg font-bold py-8 transition-transform duration-500 hover:scale-105 btn-galaxy" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                    Analyzing Document...
                  </>
                ) : (
                  'Analyze Document'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-16">
          {loading && (
            <div className="space-y-6">
              <Skeleton className="h-40 w-full rounded-xl bg-muted/50" />
              <Skeleton className="h-40 w-full rounded-xl bg-muted/50" />
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mt-6 bg-destructive/10 border-destructive/30 text-destructive-foreground">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {results.length > 0 && !loading && (
            <div className="space-y-6 mt-12">
              <h2 className="text-4xl font-bold tracking-tight text-center mb-8">Results</h2>
              {results.map((result, index) => (
                <Card 
                  key={index} 
                  className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50"
                  style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-primary flex items-start gap-3">
                      <Search className="h-6 w-6 mt-1 flex-shrink-0" />
                      <span>{result.question}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose dark:prose-invert max-w-none text-card-foreground/90 whitespace-pre-wrap leading-relaxed">
                      {result.answer}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        <footer className="text-center mt-16 text-muted-foreground">
          <p>Built with ❤️ by team Innov8</p>
        </footer>
      </main>

      <div className="absolute inset-0 z-0 opacity-20 dark:bg-galaxy" style={{filter: 'blur(100px)'}}></div>

      <style jsx>{`
        .prose {
          color: hsl(var(--foreground));
        }
        .prose :where(code):not(:where([class~="not-prose"] *)) {
          color: hsl(var(--primary));
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}