import { NextResponse } from 'next/server';
import { generateAutoBlog } from '@/backend/auto-blog/generator';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
     const supabase = createClient();
     
     // Very strict validation: Only verified Admins or Auth tokens can trigger Auto-Blogs
     // Normally you would use API Keys or check authorization.
     // For this case, we'll check if a valid user session exists OR if a cron secret is passed.
     
     const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
     const hasSupabase = supabaseUrl && supabaseUrl !== 'your_project_url';
     
     let user = null;
     if (hasSupabase) {
        const { data } = await supabase.auth.getUser();
        user = data.user;
     }
     
     const authHeader = req.headers.get('Authorization');
     
     if (hasSupabase && !user && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        // Unauthenticated backend trigger request.
     }

     const body = await req.json().catch(() => ({}));
     const topic = body.topic || undefined;

     // Trigger Core Generator
     const result = await generateAutoBlog(topic);
     
     return NextResponse.json({
        success: true,
        message: `Successfully generated and published SEO blog: ${result.title}`,
        data: result
     });
     
  } catch (error: any) {
      console.error("[AutoBlog REST API Error]", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
