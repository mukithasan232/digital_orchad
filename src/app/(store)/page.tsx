import Image from "next/image";
import Link from "next/link";
import { blogPosts, varieties } from "@/lib/data";
import { ArrowRight, Star, ShieldCheck, Truck, Clock, ShoppingCart } from "lucide-react";

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Digital Orchard',
    url: 'https://digitalorchard.com.bd',
    description: 'Buy premium, chemical-free fresh mangoes directly from the gardens of Rajshahi.',
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-transparent">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/mango10/2000/1000"
            alt="Mango Orchard in Bangladesh"
            fill
            className="object-cover opacity-10 blur-[2px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 py-24 md:py-32 flex flex-col items-start max-w-4xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary font-bold text-sm mb-6 border border-primary/30 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            ✨ Direct from Rajshahi Gardens
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground mb-6 leading-[1.1]">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400 drop-shadow-sm">Best Mango</span> in Bangladesh, Delivered.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl font-light">
            Order premium, chemical-free, and garden-fresh mangoes online. Experience the authentic taste of Langra and Himsagar with trusted delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto">
            <Link href="/mangoes" className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:-translate-y-1">
              View All Mangoes <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/price/rajshahi-mango-price-today" className="px-8 py-4 bg-background/50 backdrop-blur-md border border-border/50 text-foreground font-semibold rounded-full hover:bg-background/80 transition-all flex items-center justify-center hover:-translate-y-1 shadow-sm">
              Check Today&apos;s Price
            </Link>
          </div>
          
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                  <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} width={40} height={40} alt="Customer" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-primary">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-muted-foreground mt-0.5">Trusted by 10,000+ customers in BD</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories / Varieties */}
      <section className="py-24 bg-transparent relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                Premium Varieties
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Category</span></h2>
              <p className="text-lg text-muted-foreground">Browse our exclusive selection of hand-picked mango varieties sourced from authentic gardens.</p>
            </div>
            <Link href="/mangoes" className="group hidden md:flex items-center gap-2 text-foreground font-bold hover:text-primary transition-colors bg-white/5 backdrop-blur-md border border-border/50 px-6 py-3 rounded-full hover:border-primary/50">
              View All Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {varieties.map((variety, index) => (
              <Link href={`/mangoes?category=${variety.toLowerCase()}`} key={index} className="group flex flex-col bg-card/40 backdrop-blur-xl rounded-[2rem] border border-white/20 dark:border-white/5 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.2)] hover:border-primary/30 hover:-translate-y-2 transition-all duration-500 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90 z-10 pointer-events-none"></div>
                <div className="relative h-80 overflow-hidden bg-muted/30">
                  <Image
                    src={`https://picsum.photos/seed/${variety.toLowerCase()}10/800/800`}
                    alt={`${variety} Mango Category`}
                    fill
                    className="object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 z-20"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col z-30">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-black rounded-full shadow-sm tracking-wider uppercase border border-white/30">
                      Top Choice
                    </span>
                  </div>
                  <h3 className="font-extrabold text-3xl text-white group-hover:text-primary transition-colors mb-2 drop-shadow-md">{variety}</h3>
                  <div className="flex items-center gap-2 text-white/90 group-hover:text-white transition-colors">
                    <span className="text-sm font-semibold">Explore Varieties</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/mango" className="inline-flex items-center gap-2 text-primary font-semibold border border-primary/20 px-6 py-3 rounded-full hover:bg-primary/5">
              View All Fruits <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-transparent relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group flex flex-col items-center text-center p-10 bg-card/30 backdrop-blur-xl rounded-[2.5rem] shadow-lg border border-white/20 hover:-translate-y-2 hover:shadow-xl transition-all duration-500 hover:bg-card/50">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black mb-4">100% Chemical Free</h3>
              <p className="text-muted-foreground leading-relaxed">We guarantee zero carbide or formalin. Our mangoes ripen naturally on the trees or in safe traditional ways.</p>
            </div>
            <div className="group flex flex-col items-center text-center p-10 bg-card/30 backdrop-blur-xl rounded-[2.5rem] shadow-lg border border-white/20 hover:-translate-y-2 hover:shadow-xl transition-all duration-500 hover:bg-card/50">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-3xl flex items-center justify-center text-secondary mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-inner">
                <Truck className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black mb-4">Nationwide Delivery</h3>
              <p className="text-muted-foreground leading-relaxed">From Rajshahi direct to your door in Dhaka, Chittagong, Sylhet, and anywhere else in Bangladesh.</p>
            </div>
            <div className="group flex flex-col items-center text-center p-10 bg-card/30 backdrop-blur-xl rounded-[2.5rem] shadow-lg border border-white/20 hover:-translate-y-2 hover:shadow-xl transition-all duration-500 hover:bg-card/50">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500/20 to-orange-500/5 rounded-3xl flex items-center justify-center text-orange-500 mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
                <Clock className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black mb-4">Garden Fresh</h3>
              <p className="text-muted-foreground leading-relaxed">Mangoes are harvested only after you place an order, ensuring maximum freshness and perfect taste.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog & Content Hub Section for SEO */}
      <section className="py-24 bg-transparent relative z-10 border-t border-border/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-4 border border-primary/20">🥭 Knowledge Base</span>
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">King of Fruits</span></h2>
              <p className="text-lg text-muted-foreground">From price updates to buying guides, stay informed about the King of Fruits.</p>
            </div>
            <Link href="/blog" className="group hidden md:flex items-center gap-2 text-foreground font-bold hover:text-primary transition-colors bg-white/5 backdrop-blur-md border border-border/50 px-6 py-3 rounded-full hover:border-primary/50">
              Read All Blogs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="group flex flex-col bg-card/40 backdrop-blur-xl rounded-[2rem] border border-white/20 dark:border-white/5 overflow-hidden hover:shadow-[0_15px_30px_-10px_rgba(245,158,11,0.2)] hover:border-primary/30 hover:-translate-y-2 transition-all duration-500">
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-white/10 text-foreground">
                    {post.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1 relative bg-gradient-to-t from-background/50 to-transparent">
                  <h3 className="font-extrabold text-2xl mb-3 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                  <p className="text-muted-foreground text-base mb-6 line-clamp-3">{post.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground font-semibold">
                    <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="text-primary group-hover:text-orange-500 flex items-center gap-1 transition-colors">Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Schema / Section */}
      <section className="py-24 bg-transparent relative z-10 border-t border-border/20">
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <h2 className="text-4xl font-black text-center mb-12 tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-card/40 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 dark:border-white/5 shadow-lg hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.15)] transition-all duration-500 hover:border-primary/30">
              <h3 className="text-xl font-black mb-3 text-foreground flex items-center gap-2"><span className="text-primary text-2xl">•</span> How to buy mango online in Bangladesh?</h3>
              <p className="text-muted-foreground text-lg leading-relaxed ml-6">You can easily buy fresh mangoes online in Bangladesh through Digital Orchard. Select your preferred variety like Langra or Himsagar, add to cart, and choose your delivery location. We deliver directly from the gardens of Rajshahi.</p>
            </div>
            <div className="bg-card/40 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 dark:border-white/5 shadow-lg hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.15)] transition-all duration-500 hover:border-primary/30">
              <h3 className="text-xl font-black mb-3 text-foreground flex items-center gap-2"><span className="text-primary text-2xl">•</span> What is the price of Rajshahi mango today?</h3>
              <p className="text-muted-foreground text-lg leading-relaxed ml-6">The price of Rajshahi mango varies by season and variety. Currently, premium Langra is priced around 120 BDT/kg. Check our daily updated price page for exact market rates.</p>
            </div>
            <div className="bg-card/40 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 dark:border-white/5 shadow-lg hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.15)] transition-all duration-500 hover:border-primary/30">
              <h3 className="text-xl font-black mb-3 text-foreground flex items-center gap-2"><span className="text-primary text-2xl">•</span> Which is the best mango in Bangladesh?</h3>
              <p className="text-muted-foreground text-lg leading-relaxed ml-6">While taste is subjective, Langra and Himsagar are widely considered the best mangoes in Bangladesh due to their incredible sweetness, thin skin, and minimal fiber content.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
