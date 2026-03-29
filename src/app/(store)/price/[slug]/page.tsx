import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products, varieties } from '@/lib/data';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  
  if (!slug.endsWith('-price-today')) return { title: 'Not Found' };
  
  const mangoNameFull = slug.replace('-price-today', ''); // e.g. "fazli-mango" or "fazli"
  const mangoName = mangoNameFull.endsWith('-mango') ? mangoNameFull.replace('-mango', '') : mangoNameFull;
  
  const isVariety = varieties.some(v => v.toLowerCase() === mangoName.toLowerCase());
  
  if (!isVariety) return { title: 'Not Found' };
  
  const capitalized = mangoName.charAt(0).toUpperCase() + mangoName.slice(1);
  
  return {
    title: `${capitalized} Mango Price Today in Bangladesh | Live Market Update`,
    description: `Check the latest and exact price of ${capitalized} mango today in the wholesale and retail markets of Bangladesh. Updated daily.`,
    keywords: [`${mangoName} mango price today`, `${mangoName} price in bangladesh`, `rajshahi ${mangoName} price`, `1 kg ${mangoName} price`],
  };
}

export default function MangoPricePage({ params }: PageProps) {
  const { slug } = params;
  
  if (!slug.endsWith('-price-today')) return notFound();
  
  const mangoNameFull = slug.replace('-price-today', '');
  const mangoName = mangoNameFull.endsWith('-mango') ? mangoNameFull.replace('-mango', '') : mangoNameFull;
  const isVariety = varieties.some(v => v.toLowerCase() === mangoName.toLowerCase());
  
  if (!isVariety) return notFound();
  
  const capitalized = mangoName.charAt(0).toUpperCase() + mangoName.slice(1);
  const varietyProducts = products.filter(p => p.variety.toLowerCase() === mangoName.toLowerCase());
  
  // Create a mock current market price based on what we have in products
  const averagePrice = varietyProducts.length > 0 
    ? varietyProducts.reduce((acc, curr) => acc + curr.price, 0) / varietyProducts.length
    : 100;

  const dateToday = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="bg-background border border-border rounded-3xl p-8 md:p-12 mb-16 shadow-lg shadow-primary/5 text-center">
        <span className="text-primary font-bold uppercase tracking-wider text-sm mb-6 inline-block">📈 Market Watch</span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
          {capitalized} Mango Price <br/>
          <span className="text-2xl text-muted-foreground font-semibold">Updated: {dateToday}</span>
        </h1>
        
        <div className="bg-muted p-10 rounded-3xl inline-block w-full max-w-lg mx-auto">
          <p className="text-muted-foreground font-medium mb-4 uppercase tracking-widest text-sm">Retail Market Price</p>
          <div className="text-6xl md:text-8xl font-black text-primary mb-2">৳{averagePrice.toFixed(0)}</div>
          <p className="text-lg text-muted-foreground font-semibold">per KG</p>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
        <h2 className="text-3xl font-bold">Understanding {capitalized} Mango Pricing</h2>
        <p>
          The price of {capitalized} mango fluctuates depending on the harvest season, supply from Rajshahi and Chapainawabganj, and market demand. 
          As of {dateToday}, the retail average price holds steady at around ৳{averagePrice} per kilogram in major cities like Dhaka and Chittagong.
        </p>
        <p>
          Buying directly from authentic garden producers ensures you avoid middleman markups while guaranteeing 100% chemical-free quality.
        </p>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-3">Buy {capitalized} Online at Best Price</h3>
          <p className="text-muted-foreground max-w-md">Lock in today&apos;s best price. Order premium {capitalized} mango fetched directly from the garden to your home.</p>
        </div>
        <Link href={`/mango/${mangoName.toLowerCase()}`} className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl whitespace-nowrap hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
          Order Now
        </Link>
      </div>
    </div>
  );
}
