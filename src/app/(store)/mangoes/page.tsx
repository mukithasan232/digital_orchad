import { products } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";

export const metadata = {
  title: "All Products | Digital Orchard",
  description: "Browse 200+ varieties of hand-picked, organic mangoes from Bangladesh securely monitored via our unified platform.",
};

export default function AllProductsPage() {
  return (
    <div className="container mx-auto px-4 py-16 relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-primary/10 to-transparent -z-10 rounded-b-[4rem]"></div>
      <div className="absolute top-20 right-10 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Our Complete Collection
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Displaying {products.length} live products directly imported from our verified API layer and databases.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, i) => (
          <Link 
            href={`/mangoes/${product.slug}`} 
            key={product.id} 
            className="group flex flex-col bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden hover:shadow-2xl hover:border-primary/50 hover:-translate-y-2 transition-all duration-300"
            style={{ animationDelay: `${(i % 10) * 50}ms` }}
          >
            <div className="relative h-64 overflow-hidden bg-muted">
              {/* Image transform scale on hover */}
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-foreground shadow-md flex items-center gap-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <MapPin className="w-3 h-3" /> {product.location}
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-transparent to-muted/10">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
              </div>
              
              <div className="flex items-center gap-1.5 text-yellow-500 mb-4 bg-yellow-500/10 w-fit px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs font-extrabold text-foreground">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
              </div>
              
              <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                <div>
                   <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Price</p>
                   <p className="font-extrabold text-2xl text-foreground">৳{product.price}<span className="text-sm font-medium text-muted-foreground">/kg</span></p>
                </div>
                <div className="bg-primary/10 text-primary w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-12 transition-all duration-300">
                   <span className="font-bold text-lg">+</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
