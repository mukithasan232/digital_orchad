import { createClient } from '@/lib/supabase/server';

export async function generateAutoBlog(topic?: string) {
  const supabase = createClient();
  
  // Array of possible topics if one isn't provided
  const topics = [
    "Health benefits of Rajshahi Langra",
    "How to identify authentic Chapainawabganj Himsagar",
    "The history behind Fazli mangoes",
    "Why chemical-free mangoes matter for your family",
    "Best recipes for ripe Amrupali mangoes"
  ];
  
  const selectedTopic = topic || topics[Math.floor(Math.random() * topics.length)];
  const slug = selectedTopic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  console.log(`[AutoBlog] Selected Topic: ${selectedTopic}`);

  // In a real production system, you would call OpenAI/Gemini here:
  // const content = await generateWithGemini(`Write an SEO optimized blog about ${selectedTopic}. Output in Markdown...`);
  
  // Safe Fallback Mock Content
  const mockContent = `
## The Magic of ${selectedTopic}

If you are a true mango lover in Bangladesh, you know that the hype is real. There is nothing quite like biting into fresh, sweet, and perfectly ripened fruit straight from the authentic orchards. 

In this complete guide, we will explore everything you need to know about this topic. Whether you are buying for your family or looking to export, understanding the roots, the texture, and the authenticity of your purchase is key. 

### Why Quality Matters
When mangoes are harvested properly without harmful chemicals like carbide, the natural sugars develop perfectly. This means not only a better taste but a much healthier option for your children. 

> "Authentic mangoes from Rajshahi and Chapainawabganj are a national treasure."

### How to Guarantee Freshness
When ordering your next batch through Digital Orchard, rest assured that our farmers are verified. We take pride in delivering the fruit exactly as nature intended.

*Stay tuned for more updates on our mango harvest!*
  `.trim();

  const generatedBlog = {
     title: selectedTopic,
     slug: slug,
     content: mockContent,
     seo_description: `Learn everything you need to know about ${selectedTopic} in our latest Digital Orchard guide.`,
     seo_keywords: selectedTopic.split(' ').join(', ').toLowerCase(),
     image_url: "https://images.unsplash.com/photo-1628153096232-2dcade230cc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  };

  // Attempt to save to Supabase
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_project_url') {
     const { data, error } = await supabase.from('blogs').insert([generatedBlog]).select().single();
     if (error) {
        throw new Error(`Failed to save blog: ${error.message}`);
     }
     return data;
  }

  // If no DB is attached yet, just return the mocked object
  return { ...generatedBlog, id: 'mock-id-' + Date.now() };
}
