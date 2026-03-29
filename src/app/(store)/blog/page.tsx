import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Blog & Mango Guides',
  description: 'Read the latest updates, market prices, and ultimate guides on buying the best mangoes in Bangladesh from Digital Orchard.',
};

export default function BlogListPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl font-extrabold mb-6">Mango <span className="text-primary">Journal</span></h1>
        <p className="text-xl text-muted-foreground">
          Your ultimate repository for market updates, buying tips, and all things related to the king of fruits in Bangladesh.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id} className="group flex flex-col bg-card rounded-3xl border border-border overflow-hidden hover:shadow-xl transition-all">
            <div className="relative h-64 overflow-hidden bg-muted">
              <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold shadow-sm uppercase tracking-wide">
                {post.category}
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium mb-4">
                <time dateTime={post.publishDate}>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                <span>•</span>
                <span>{post.author}</span>
              </div>
              <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">{post.title}</h2>
              <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">{post.excerpt}</p>
              <div className="mt-auto font-bold text-primary group-hover:underline flex items-center gap-2">
                Continue Reading
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
