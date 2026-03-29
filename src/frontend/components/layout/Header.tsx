import Link from "next/link";
import { ShoppingCart, Menu, Search, User, Leaf } from "lucide-react";
import { AnimationToggle } from "../AnimationToggle";

export function Header() {
  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 w-full pointer-events-none">
      <header className="pointer-events-auto w-full max-w-6xl rounded-full border border-white/10 bg-background/70 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)] hover:border-white/20 dark:border-white/5 dark:bg-black/50">
        <div className="flex h-16 items-center justify-between px-6 md:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-primary to-orange-500 rounded-full p-1.5 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70 drop-shadow-sm group-hover:from-primary group-hover:to-orange-500 transition-all duration-500 hidden sm:block">Digital Orchard</span>
            </Link>
            
            <nav className="hidden md:flex gap-8 text-sm font-semibold text-muted-foreground">
              <Link href="/" className="transition-colors hover:text-foreground relative group py-1">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-orange-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
              <Link href="/mangoes" className="transition-colors hover:text-foreground relative group py-1">
                Store
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-orange-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
              <Link href="/mangoes/langra" className="transition-colors hover:text-foreground flex items-center gap-1.5 group relative py-1">
                Langra <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-orange-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
              <Link href="/blog" className="transition-colors hover:text-foreground relative group py-1">
                Journal
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-orange-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <AnimationToggle />
            <button aria-label="Search" className="w-10 h-10 flex items-center justify-center rounded-full text-foreground/70 hover:text-primary hover:bg-primary/10 transition-all duration-300">
              <Search className="h-4 w-4" />
            </button>
            <Link href="/auth" aria-label="Account" className="w-10 h-10 hidden sm:flex items-center justify-center rounded-full text-foreground/70 hover:text-primary hover:bg-primary/10 transition-all duration-300">
              <User className="h-4 w-4" />
            </Link>
            <button aria-label="Cart" className="w-10 h-10 flex items-center justify-center rounded-full text-foreground/70 hover:text-primary hover:bg-primary/10 transition-all duration-300 relative group">
              <ShoppingCart className="h-4 w-4 transform group-hover:scale-110 transition-transform" />
              <span className="absolute top-1 right-1 bg-gradient-to-br from-primary to-orange-500 text-white text-[9px] font-black w-3.5 h-3.5 flex items-center justify-center rounded-full shadow-sm ring-2 ring-background">0</span>
            </button>
            <button aria-label="Menu" className="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-foreground/70 hover:text-primary hover:bg-primary/10 transition-all duration-300">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
