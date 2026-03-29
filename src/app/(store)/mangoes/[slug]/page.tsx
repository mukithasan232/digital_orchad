import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products, varieties } from '@/lib/data';
import { Star, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  
  // Check if it's a variety
  const isVariety = varieties.some(v => v.toLowerCase() === slug.toLowerCase());
  
  if (isVariety) {
    const capitalized = slug.charAt(0).toUpperCase() + slug.slice(1);
    return {
      title: `Buy fresh ${capitalized} Mango Online in Bangladesh | Best Price`,
      description: `Order authentic, chemical-free ${capitalized} mangoes online directly from the gardens of Rajshahi and Chapainawabganj. Best price guaranteed.`,
      keywords: [`${slug} mango online`, `buy ${slug} mango`, `best ${slug} mango in bangladesh`, `chemical free ${slug}`],
      openGraph: {
        title: `Buy ${capitalized} Mango Online`,
        description: `Fresh, hand-picked ${capitalized} mangoes delivered across Bangladesh.`,
      }
    };
  }

  // Check if it's a product
  const product = products.find(p => p.slug === slug);
  if (product) {
    return {
      title: `${product.name} | Buy Online at Best Price in Bangladesh`,
      description: product.description,
      keywords: [product.name, `${product.variety} mango`, `buy ${product.name} online`, product.location],
      openGraph: {
        title: product.name,
        description: product.description,
        images: [{ url: product.image }],
      }
    };
  }

  return { title: 'Not Found' };
}

export const revalidate = 3600; // Cache these product pages for 1 hour to ensure ultra-fast load times

import { createClient } from '@/lib/supabase/server';

export default async function ProductOrVarietyPage({ params }: PageProps) {
  const { slug } = params;
  const isVariety = varieties.some(v => v.toLowerCase() === slug.toLowerCase());
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  // Supabase Fetchers
  let fetchedProducts: any[] = [];
  let fetchedSingleProduct: any = null;

  if (supabaseUrl && supabaseUrl !== 'your_project_url') {
     const supabase = createClient();
     if (isVariety) {
        const { data } = await supabase.from('products').select('*').eq('category', slug.charAt(0).toUpperCase() + slug.slice(1));
        fetchedProducts = data || [];
     } else {
        const { data } = await supabase.from('products').select('*').eq('slug', slug).single();
        fetchedSingleProduct = data;
     }
  }

  if (isVariety) {
    // Merge remote and mock data safely
    const mockVarietyProducts = products.filter(p => p.variety.toLowerCase() === slug.toLowerCase());
    const varietyProducts = fetchedProducts.length > 0 ? fetchedProducts : mockVarietyProducts;
    const capitalized = slug.charAt(0).toUpperCase() + slug.slice(1);
    
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Buy <span className="text-primary">{capitalized} Mango</span> Online
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
          Discover our selection of premium, chemical-free {capitalized} mangoes. Sourced directly from authentic gardens and delivered fresh to your doorstep anywhere in Bangladesh.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {varietyProducts.length > 0 ? (
            varietyProducts.map((product) => (
              <Link href={`/mangoes/${product.slug}`} key={product.id} className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all">
                <div className="relative h-64 overflow-hidden">
                  <Image src={product.image || product.image_url} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    📍 {product.location}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-1 text-primary mb-3">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold">{product.rating}</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <p className="font-extrabold text-2xl">৳{product.price || product.price_per_kg}<span className="text-sm font-normal text-muted-foreground">/kg</span></p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
             <p>Out of stock for this variety at the moment.</p>
          )}
        </div>
      </div>
    );
  }

  const product = fetchedSingleProduct || products.find(p => p.slug === slug);
  if (!product) return notFound();

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [product.image],
    "description": product.description,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Digital Orchard"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviews
    },
    "offers": {
      "@type": "Offer",
      "url": `https://digitalorchard.com.bd/mangoes/${product.slug}`,
      "priceCurrency": "BDT",
      "price": product.price || product.price_per_kg,
      "priceValidUntil": "2024-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Digital Orchard"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
       <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb for SEO */}
        <nav className="flex text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/mangoes/${(product.variety || product.category || '').toLowerCase()}`} className="hover:text-primary">{product.variety || product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
             <Image src={product.image || product.image_url} alt={product.name} fill className="object-cover" priority />
          </div>
          <div className="flex flex-col">
            <h1 className="text-4xl font-extrabold mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-6">
               <div className="flex items-center gap-1 text-primary">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-bold">{product.rating}</span>
                </div>
                <span className="text-muted-foreground underline">{product.reviews || product.reviews_count} reviews</span>
                <span className="px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-sm font-bold">
                  In Stock ({product.stock || product.stock_kg} kg)
                </span>
            </div>
            
            <p className="text-4xl font-extrabold text-primary mb-6">৳{product.price || product.price_per_kg} <span className="text-xl text-muted-foreground font-normal">per kg</span></p>
            
            <p className="text-lg text-muted-foreground mb-8 text-balance">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 bg-muted p-4 rounded-xl">
                 <ShieldCheck className="w-6 h-6 text-primary" />
                 <div><p className="font-semibold text-sm">100% Organic</p><p className="text-xs text-muted-foreground">No carbide used</p></div>
              </div>
              <div className="flex items-center gap-3 bg-muted p-4 rounded-xl">
                 <Truck className="w-6 h-6 text-primary" />
                 <div><p className="font-semibold text-sm">Fast Delivery</p><p className="text-xs text-muted-foreground">From {product.location}</p></div>
              </div>
            </div>

            <button className="w-full py-4 bg-primary text-primary-foreground text-lg font-bold rounded-xl hover:bg-primary/90 transition-all flex justify-center items-center gap-2 shadow-lg shadow-primary/20">
              Add to Cart <ArrowRight className="w-5 h-5"/>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
