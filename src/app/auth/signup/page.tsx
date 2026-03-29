"use client";

import Link from "next/link";
import { ArrowLeft, UserPlus, Mail, Lock, Store } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isFarmer, setIsFarmer] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (supabaseUrl && supabaseUrl !== 'your_project_url') {
         const { createBrowserClient } = await import('@supabase/ssr');
         const supabase = createBrowserClient(
           process.env.NEXT_PUBLIC_SUPABASE_URL!,
           process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
         );
         
         const role = isFarmer ? 'farmer' : 'customer';
         
         const { error } = await supabase.auth.signUp({ 
            email, 
            password,
            options: {
               data: { full_name: fullName, role: role }
            }
         });
         
         if (error) {
            setError(error.message);
            setIsLoading(false);
            return;
         }
         
         // Successful Supabase Registration
         router.push("/auth?message=registration_successful_please_login");
         return;
      }
      
      // Fallback Demo
      await new Promise(resolve => setTimeout(resolve, 800));
      router.push("/auth");
    } catch {
       setError("Something went wrong during sign up.");
    } finally {
       setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/40 relative">
      <div className="absolute top-8 left-8">
        <Link href="/auth" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>
      </div>

      <div className="max-w-md w-full bg-card rounded-3xl p-8 border shadow-xl">
        <div className="text-center mb-8">
           <span className="text-primary font-bold tracking-wider uppercase text-xs mb-2 block">Join the Orchard</span>
           <h1 className="text-3xl font-extrabold mb-2">Create Account</h1>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
           <div className="space-y-1">
             <label className="text-sm font-semibold text-foreground">Full Name</label>
             <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="block w-full px-4 py-3 border border-border rounded-xl bg-muted/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Rafiqul Islam" />
           </div>

           <div className="space-y-1">
             <label className="text-sm font-semibold text-foreground">Email Address</label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center"><Mail className="h-5 w-5 text-muted-foreground" /></div>
               <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-muted/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="email@example.com" />
             </div>
           </div>

           <div className="space-y-1">
             <label className="text-sm font-semibold text-foreground">Password</label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center"><Lock className="h-5 w-5 text-muted-foreground" /></div>
               <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-muted/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="••••••••" />
             </div>
           </div>

           <div className="pt-2">
             <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-primary">
                <input type="checkbox" checked={isFarmer} onChange={(e) => setIsFarmer(e.target.checked)} className="text-primary w-5 h-5 rounded focus:ring-primary accent-primary" />
                <div className="flex flex-col">
                   <span className="font-bold flex items-center gap-2"><Store className="w-4 h-4 text-primary" /> I am a Farmer</span>
                   <span className="text-xs text-muted-foreground block">Select this if you own an orchard and want to list mangoes.</span>
                </div>
             </label>
           </div>

           {error && <p className="text-xs text-red-500 font-medium bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>}

           <button disabled={isLoading} type="submit" className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 flex justify-center items-center gap-2 shadow-lg disabled:opacity-70 mt-4">
             {isLoading ? "Creating..." : "Sign Up"}
             {!isLoading && <UserPlus className="w-4 h-4"/>}
           </button>
        </form>
      </div>
    </div>
  );
}
