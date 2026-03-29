import { MetadataRoute } from 'next';
import { products, blogPosts, locations, varieties } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://digitalorchard.com.bd';

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/mango/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const locationUrls = locations.map((location) => ({
    url: `${baseUrl}/location/${location.toLowerCase()}-mango`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const varietyUrls = varieties.map((variety) => ({
    url: `${baseUrl}/mango/${variety.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));
  
  const priceUrls = varieties.map((variety) => ({
    url: `${baseUrl}/price/${variety.toLowerCase()}-mango-price-today`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...productUrls,
    ...blogUrls,
    ...locationUrls,
    ...varietyUrls,
    ...priceUrls,
  ];
}
