// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Sparkles, ArrowLeft, MessageSquare, Send, CheckCircle } from 'lucide-react';
// import Link from 'next/link';
// import { ThemeToggle } from '@/components/theme-toggle';

// export default function FeedbackPage() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [feedback, setFeedback] = useState('');
//   const [rating, setRating] = useState(5);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (!feedback.trim()) {
//       setError('Please provide your feedback.');
//       setLoading(false);
//       return;
//     }

//     // Simulate feedback submission (you can replace this with actual API call)
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
//       setSuccess(true);
//       setName('');
//       setEmail('');
//       setFeedback('');
//       setRating(5);
//     } catch (err) {
//       setError('Failed to submit feedback. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden">
//       <div className="absolute top-4 left-4 z-20">
//         <Button asChild variant="ghost" size="icon">
//           <Link href="/">
//             <ArrowLeft className="h-6 w-6" />
//           </Link>
//         </Button>
//       </div>
//       <div className="absolute top-4 right-4 z-20">
//         <ThemeToggle />
//       </div>
//       <main className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
//         <header className="text-center my-16">
//           <div className="inline-block p-4 bg-primary/10 rounded-full mb-6 animate-pulse-glow">
//             <MessageSquare className="h-12 w-12 text-primary" />
//           </div>
//           <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
//             Feedback
//           </h1>
//           <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
//             Help us improve QueryWise! Share your thoughts, suggestions, or report any issues you've encountered.
//           </p>
//         </header>

//         {success ? (
//           <Card className="w-full bg-card/80 backdrop-blur-md border-border/20 shadow-2xl shadow-primary/10">
//             <CardContent className="p-8 text-center">
//               <div className="inline-block p-4 bg-green-500/10 rounded-full mb-6">
//                 <CheckCircle className="h-12 w-12 text-green-500" />
//               </div>
//               <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
//               <p className="text-muted-foreground mb-6">
//                 Your feedback has been submitted successfully. We appreciate your input and will use it to improve QueryWise.
//               </p>
//               <Button onClick={() => setSuccess(false)} className="gap-2">
//                 <MessageSquare className="h-4 w-4" />
//                 Submit Another Feedback
//               </Button>
//             </CardContent>
//           </Card>
//         ) : (
//           <Card className="w-full bg-card/80 backdrop-blur-md border-border/20 shadow-2xl shadow-primary/10">
//             <CardHeader>
//               <CardTitle className="text-2xl font-bold flex items-center gap-3">
//                 <MessageSquare className="h-6 w-6 text-primary" />
//                 Share Your Feedback
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-8">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {error && (
//                   <Alert variant="destructive" className="bg-destructive/10 border-destructive/30 text-destructive-foreground">
//                     <AlertDescription>{error}</AlertDescription>
//                   </Alert>
//                 )}

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <label htmlFor="name" className="text-sm font-medium">
//                       Name (Optional)
//                     </label>
//                     <Input
//                       id="name"
//                       type="text"
//                       placeholder="Your name"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       disabled={loading}
//                       className="bg-input/50 border-border/80"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label htmlFor="email" className="text-sm font-medium">
//                       Email (Optional)
//                     </label>
//                     <Input
//                       id="email"
//                       type="email"
//                       placeholder="your.email@example.com"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       disabled={loading}
//                       className="bg-input/50 border-border/80"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="rating" className="text-sm font-medium">
//                     How would you rate your experience?
//                   </label>
//                   <div className="flex items-center gap-2">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <button
//                         key={star}
//                         type="button"
//                         onClick={() => setRating(star)}
//                         className={`text-2xl transition-colors ${
//                           star <= rating ? 'text-yellow-400' : 'text-muted-foreground/30'
//                         }`}
//                         disabled={loading}
//                       >
//                         ★
//                       </button>
//                     ))}
//                     <span className="ml-2 text-sm text-muted-foreground">
//                       {rating} out of 5
//                     </span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="feedback" className="text-sm font-medium">
//                     Your Feedback *
//                   </label>
//                   <Textarea
//                     id="feedback"
//                     placeholder="Tell us about your experience with QueryWise. What did you like? What could be improved? Any bugs you encountered?"
//                     value={feedback}
//                     onChange={(e) => setFeedback(e.target.value)}
//                     required
//                     rows={6}
//                     disabled={loading}
//                     className="resize-y bg-input/50 border-border/80"
//                   />
//                 </div>

//                 <Button 
//                   type="submit" 
//                   size="lg"
//                   className="w-full text-lg font-bold py-6 transition-transform duration-500 hover:scale-105 btn-galaxy" 
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <>
//                       <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" />
//                       Submitting...
//                     </>
//                   ) : (
//                     <>
//                       <Send className="mr-3 h-6 w-6" />
//                       Submit Feedback
//                     </>
//                   )}
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>
//         )}
        
//         <footer className="text-center mt-16 text-muted-foreground">
//           <p>Built with ❤️ by team Innov8</p>
//         </footer>
//       </main>
      
//       <div className="absolute inset-0 z-0 opacity-20 dark:bg-galaxy" style={{filter: 'blur(100px)'}}></div>
//     </div>
//   );
// }
