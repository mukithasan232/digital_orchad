"use client";

import { Plus, Sparkles } from "lucide-react";
import { useState } from "react";

export default function AdminContentPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [blogs, setBlogs] = useState([
    { id: '1', title: 'Why Rajshahi Mangoes are the best in the World', views: '2.4K', status: 'Published' },
    { id: '2', title: 'How to Identify Formalin-Free Mangoes', views: '1.1K', status: 'Draft' },
  ]);

  const handleAutoGenerate = async () => {
     setIsGenerating(true);
     
     try {
       const res = await fetch('/api/auto-blog', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({})
       });
       
       const json = await res.json();
       if (json.success && json.data) {
          // Render newly auto-generated blog immediately in local dashboard state
          setBlogs(prev => [{
             id: json.data.id || String(Date.now()),
             title: json.data.title,
             views: '0',
             status: 'Published'
          }, ...prev]);
          alert("Success! " + json.message);
       } else {
          alert("Error: " + json.error);
       }
     } catch {
       alert("Network failed during generation.");
     } finally {
        setIsGenerating(false);
     }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Content & SEO Manager</h2>
          <p className="text-muted-foreground mt-1">Manage publications, guides, and automatically generate hyper-optimized SEO blogs.</p>
        </div>
        <div className="flex items-center gap-3">
           <button 
             disabled={isGenerating}
             onClick={handleAutoGenerate}
             className="bg-accent text-accent-foreground border font-bold px-4 py-2.5 rounded-xl hover:bg-accent/80 transition-all flex items-center gap-2 shadow-sm disabled:opacity-50">
             <Sparkles className="w-5 h-5 text-yellow-500" />
             {isGenerating ? "AI Processing..." : "Auto-Generate Blog"}
           </button>
           <button className="bg-primary text-primary-foreground font-bold px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-sm border border-primary/20">
             <Plus className="w-5 h-5" />
             Write Post
           </button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="bg-muted/30">
              <tr className="border-b transition-colors">
                <th className="h-12 px-6 text-left font-semibold text-muted-foreground">Article Title</th>
                <th className="h-12 px-6 text-left font-semibold text-muted-foreground">Author</th>
                <th className="h-12 px-6 text-left font-semibold text-muted-foreground">Views</th>
                <th className="h-12 px-6 text-right font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
               {blogs.map(blog => (
                 <tr key={blog.id} className="transition-colors hover:bg-muted/30">
                   <td className="p-4 px-6 align-middle font-bold text-foreground max-w-[300px] truncate">
                     {blog.title}
                   </td>
                   <td className="p-4 px-6 align-middle text-muted-foreground">
                     Digital Orchard AI
                   </td>
                   <td className="p-4 px-6 align-middle font-mono font-medium">
                     {blog.views}
                   </td>
                   <td className="p-4 px-6 align-middle text-right">
                     <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${blog.status === 'Published' ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-gray-500/10 text-gray-600 border border-gray-500/20'}`}>
                       {blog.status}
                     </span>
                   </td>
                 </tr>
               ))}
               {blogs.length === 0 && (
                 <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No blogs found. Let AI generate one!</td></tr>
               )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
