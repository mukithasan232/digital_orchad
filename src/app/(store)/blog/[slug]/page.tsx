import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug);
  
  if (!post) {
    return { title: 'Blog Not Found' };
  }

  return {
    title: `${post.title} | Mango Expert Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author],
    }
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts.find(p => p.slug === params.slug);
  
  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [post.image],
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "author": [{
        "@type": "Person",
        "name": post.author,
      }],
      "publisher": {
        "@type": "Organization",
        "name": "Digital Orchard",
      }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <nav className="flex text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-primary">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium truncate">{post.title}</span>
        </nav>

        <header className="mb-12">
          <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 inline-block">{post.category}</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground border-b border-border pb-8">
            <span className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">DO</div>
               {post.author}
            </span>
            <span>•</span>
            <time dateTime={post.publishDate}>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
          </div>
        </header>

        <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-xl border border-border">
          <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
          <p className="lead text-xl md:text-2xl font-medium text-foreground mb-8">{post.excerpt}</p>
          
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          
          {/* Mock extra content to make the blog look full */}
          <h2>Understanding Mango Varieties</h2>
          <p>
            When we talk about the best mangoes in Bangladesh, we must categorize them based on their sweet profile, flesh texture, and time of harvest...
          </p>
          <p>
            You can always browse our <Link href="/mango" className="font-bold underline text-primary">collection of premium mangoes</Link> to order fresh harvest right from Rajshahi to your doorstep.
          </p>
        </div>
      </article>
    </>
  );
}
