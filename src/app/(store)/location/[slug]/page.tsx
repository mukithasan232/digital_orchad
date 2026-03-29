import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { locations, products } from '@/lib/data';
import Image from 'next/image';
import { Star } from 'lucide-react';

// Interface removed

// Map the "[]-mango" format correctly based on folder structure.
// Wait, the folder structure in the prompt says: `/location/[city]-mango`
// In Next.js App Router, the exact folder name dictates the parameter.
// If the folder is `src/app/location/[city]-mango/page.tsx`, the param is `params['city']-mango` which is an invalid variable name in TS!
// So I will make the folder `src/app/location/[city]/page.tsx` and just match URL.
// But wait, the user wants `/location/{city}-mango` as the literal URL structure.
// So the folder must be `src/app/location/[slug]/page.tsx` and we will parse `slug` which looks like `rajshahi-mango`.

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  
  if (!slug.endsWith('-mango')) return { title: 'Not Found' };
  
  const cityName = slug.replace('-mango', '').toLowerCase();
  const location = locations.find(l => l.toLowerCase() === cityName);
  
  if (!location) return { title: 'Not Found' };
  
  return {
    title: `Buy Best ${location} Mango Online | Direct from Garden`,
    description: `Order the most authentic, chemical-free mangoes directly from the famous gardens of ${location}, Bangladesh. Fast delivery countrywide.`,
    keywords: [`${location} mango`, `buy ${location} mango`, `${location} mango online`, `best garden in ${location}`],
  };
}

export default function LocationMangoPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  if (!slug.endsWith('-mango')) return notFound();
  
  const cityName = slug.replace('-mango', '').toLowerCase();
  const location = locations.find(l => l.toLowerCase() === cityName);
  
  if (!location) return notFound();
  
  const locationProducts = products.filter(p => p.location.toLowerCase() === location.toLowerCase());

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-4xl mx-auto mb-16 px-4">
         <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 uppercase tracking-wider">📍 Regional Specialty</span>
         <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-balance">
           Fresh Mangoes directly from <span className="text-primary">{location}</span>
         </h1>
         <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
           {location} is historically renowned for producing the finest mangoes in Bangladesh. We bring you hand-picked, premium fruits from trusted local farmers, guaranteed 100% chemical-free.
         </p>
      </div>

      <div className="mt-16 bg-muted/30 p-8 rounded-3xl border border-border mb-16">
         <h2 className="text-3xl font-bold mb-8">Available from {location}</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {locationProducts.length > 0 ? (
              locationProducts.map((product) => (
                <Link href={`/mango/${product.slug}`} key={product.id} className="group flex flex-col bg-background rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all">
                  <div className="relative h-56 overflow-hidden">
                    <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                    <div className="flex items-center gap-1 text-primary mb-3">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-bold">{product.rating}</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <p className="font-extrabold text-2xl">৳{product.price}<span className="text-sm font-normal text-muted-foreground">/{product.unit}</span></p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
               <p className="text-muted-foreground">Currently out of stock for {location} mangoes. Please check back next season.</p>
            )}
         </div>
      </div>
    </div>
  );
}
