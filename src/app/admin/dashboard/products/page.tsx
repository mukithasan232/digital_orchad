import { Package, Plus } from "lucide-react";
import { createClient } from '@/lib/supabase/server';
import Image from "next/image";
import Link from "next/link";

export default async function AdminProductsPage() {
  const supabase = createClient();
  
  // RLS (Row Level Security) ensures that if this is a farmer, 
  // they ONLY get their own products. If it is an admin, they get all.
  const { data: products, error } = await supabase.from('products').select('*');

  // Hardcoded fallback data if Supabase isn't setup
  const isMock = !products || products.length === 0;
  const displayProducts = isMock ? [
     { id: 1, name: "Premium Rajshahi Langra", stock_kg: 500, price_per_kg: 120, category: "Langra" },
     { id: 2, name: "Chapainawabganj Himsagar", stock_kg: 1200, price_per_kg: 110, category: "Himsagar" },
  ] : products;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products Management</h2>
          <p className="text-muted-foreground mt-1">Manage your orchard inventory, pricing, and live listings.</p>
        </div>
        <Link href="/admin/dashboard/products" className="bg-primary text-primary-foreground font-bold px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-sm border border-primary/20">
          <Plus className="w-5 h-5" />
          Add New Mango
        </Link>
      </div>

      {isMock && (
         <div className="mb-6 bg-yellow-50 text-yellow-800 p-4 rounded-xl border border-yellow-200 text-sm font-medium">
            ⚠️ Showing mockup data. Please connect Supabase to view live farmer-filtered inventory.
         </div>
      )}

      {/* Products Table */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="bg-muted/30">
              <tr className="border-b transition-colors">
                <th className="h-12 px-6 text-left font-semibold text-muted-foreground">Product Name</th>
                <th className="h-12 px-6 text-left font-semibold text-muted-foreground">Variety</th>
                <th className="h-12 px-6 text-left font-semibold text-muted-foreground">Stock (KG)</th>
                <th className="h-12 px-6 text-left font-semibold text-muted-foreground">Price/KG</th>
                <th className="h-12 px-6 text-right font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {displayProducts?.map((product: any) => (
                <tr key={product.id} className="transition-colors hover:bg-muted/30">
                  <td className="p-4 px-6 align-middle font-bold text-foreground">
                    {product.name}
                  </td>
                  <td className="p-4 px-6 align-middle text-muted-foreground">
                    {product.category}
                  </td>
                  <td className="p-4 px-6 align-middle font-mono font-medium">
                    {product.stock_kg} kg
                  </td>
                  <td className="p-4 px-6 align-middle font-mono font-medium">
                    ৳{product.price_per_kg}
                  </td>
                  <td className="p-4 px-6 align-middle text-right">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-green-500/10 text-green-600 border border-green-500/20">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {displayProducts?.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              <Package className="w-8 h-8 mx-auto mb-3 opacity-20" />
              <p>You have not listed any products yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
