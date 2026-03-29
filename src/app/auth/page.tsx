"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // 1. Bypass with Mock Admin for Demo Purposes
      if (email === "admin@digitalorchard.com.bd" && password === "admin123") {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network request
        // Force fully set a dummy cookie so middleware doesn't kick us out if it tries to verify
        document.cookie = "sb-dummy-auth=true; path=/;";
        router.push("/admin/dashboard");
        return;
      }

      // 2. Try actual Supabase Authentication Flow
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (supabaseUrl && supabaseKey && supabaseUrl !== 'your_project_url') {
         const { createBrowserClient } = await import('@supabase/ssr');
         const supabase = createBrowserClient(supabaseUrl, supabaseKey);
         
         const { data, error } = await supabase.auth.signInWithPassword({ email, password });
         if (error) {
            setError(error.message);
            setIsLoading(false);
            return;
         }
         
         const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single();
         if (profile?.role === 'admin' || profile?.role === 'farmer') {
            router.push("/admin/dashboard");
         } else {
            router.push("/");
         }
         router.refresh();
         return;
      }
      
      setError("Invalid credentials or Database not configured. Use admin@digitalorchard.com.bd / admin123");
    } catch {
       setError("Something went wrong during login verification.");
    } finally {
       setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background">
      {/* Left side Form */}
      <div className="flex flex-col justify-center px-8 md:px-24 bg-background relative z-10">
        <div className="absolute top-8 left-8">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Store
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <span className="text-primary font-bold tracking-wider uppercase text-xs mb-2 block">Secure Area</span>
            <h1 className="text-4xl font-extrabold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to manage your orchard, track orders, or view purchases.</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5 flex flex-col">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-foreground">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-muted/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-foreground"
                  placeholder="admin@digitalorchard.com.bd"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">Password</label>
                <a href="#" className="text-xs text-primary font-medium hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-muted/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-foreground"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 font-medium bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                {error}
              </p>
            )}

            <div className="pt-2">
              <button disabled={isLoading} type="submit" className="w-full py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex justify-center items-center gap-2 disabled:opacity-70">
                {isLoading ? "Authenticating..." : "Sign In"}
                {!isLoading && <Lock className="w-4 h-4"/>}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Don&apos;t have an account? <Link href="/auth/signup" className="text-primary font-bold hover:underline">Register here</Link>
          </p>
        </div>
      </div>

      {/* Right side Image / Branding */}
      <div className="hidden md:block relative h-full w-full bg-muted">
        <Image
          src="https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=2000&auto=format&fit=crop"
          alt="Fresh Orchard"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 z-10 text-white">
          <div className="p-8 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-bold mb-2">&quot;The farmer&apos;s digital bridge.&quot;</h2>
            <p className="text-white/80 font-medium">Digital Orchard connects your hard work directly with customers all over Bangladesh, ensuring you get the right price for your premium mangoes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
