import Link from "next/link";
import { Mail, Phone, MapPin, Leaf, ArrowRight } from "lucide-react";

export function Footer() {
  const socialIcons = [
    {
      name: "Facebook",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
      )
    },
    {
      name: "Twitter",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
      )
    },
    {
      name: "Instagram",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
      )
    },
    {
      name: "YouTube",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
      )
    }
  ];

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border/40 bg-background/40 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 pointer-events-none" />
      
      {/* Newsletter Section */}
      <div className="relative border-b border-border/40">
        <div className="container mx-auto px-6 py-16 lg:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-black tracking-tight mb-4 text-foreground">Join the Orchard Club</h2>
            <p className="text-muted-foreground text-lg">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals delivered instantly.</p>
          </div>
          <div className="w-full md:w-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-orange-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-background rounded-full p-2 border border-white/10 shadow-lg min-w-[320px]">
              <Mail className="w-5 h-5 text-muted-foreground ml-3 shrink-0" />
              <input type="email" placeholder="Enter your email address..." className="bg-transparent border-none outline-none flex-1 px-4 py-2 text-foreground placeholder:text-muted-foreground/70" />
              <button className="bg-gradient-to-r from-primary to-orange-500 text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2">
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        <div className="flex flex-col gap-6 lg:pr-8">
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <div className="bg-gradient-to-br from-primary to-orange-500 rounded-full p-2 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70 drop-shadow-sm group-hover:from-primary group-hover:to-orange-500 transition-all duration-500">Digital Orchard</span>
          </Link>
          <p className="text-muted-foreground leading-relaxed">
            Bangladesh&apos;s premium fresh fruit marketplace focusing on high-quality, chemical-free mangoes directly from the authentic gardens of Rajshahi.
          </p>
          <div className="flex items-center gap-4 mt-2">
            {socialIcons.map((social, i) => (
              <a key={i} href="#" aria-label={social.name} className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:text-white hover:bg-gradient-to-br hover:from-primary hover:to-orange-500 hover:shadow-lg transition-all duration-300 border border-border hover:border-transparent">
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg text-foreground mb-6 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Store</h3>
          <ul className="space-y-4">
            {['All Products', 'Fresh Mangoes', 'Buy Langra', 'Buy Himsagar', 'Special Offers'].map((link) => (
              <li key={link}>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group w-fit">
                  <span className="w-0 h-[1px] bg-primary group-hover:w-3 transition-all duration-300"></span>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg text-foreground mb-6 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> Company</h3>
          <ul className="space-y-4">
            {['Our Story', 'Farmer Network', 'Shipping Info', 'Privacy Policy', 'Terms of Service'].map((link) => (
              <li key={link}>
                <Link href="#" className="text-muted-foreground hover:text-secondary transition-colors flex items-center gap-2 group w-fit">
                  <span className="w-0 h-[1px] bg-secondary group-hover:w-3 transition-all duration-300"></span>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg text-foreground mb-6 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Contact Support</h3>
          <div className="flex flex-col gap-5 text-muted-foreground">
            <a href="#" className="group flex items-start gap-4 hover:text-foreground transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-0.5">Call Us Now</p>
                <p>+880 1234 567890</p>
              </div>
            </a>
            <a href="#" className="group flex items-start gap-4 hover:text-foreground transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-0.5">Email Address</p>
                <p>contact@digitalorchard.com</p>
              </div>
            </a>
            <div className="group flex items-start gap-4 transition-colors">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-0.5">Farm Location</p>
                <p>Rajshahi, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative border-t border-border/40">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground font-medium">
          <p>&copy; {new Date().getFullYear()} Digital Orchard. Roots in Bangladesh.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Security</Link>
            <Link href="#" className="hover:text-primary transition-colors">Sitemap</Link>
            <Link href="#" className="hover:text-primary transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
