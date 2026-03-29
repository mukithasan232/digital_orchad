import { Activity, DollarSign, PackageOpen, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <>
      {/* Top Value Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
           <div className="flex justify-between items-center mb-4">
              <h3 className="tracking-tight text-sm font-medium">Total Revenue</h3>
              <DollarSign className="w-5 h-5 text-muted-foreground" />
           </div>
           <div>
              <div className="text-3xl font-bold font-mono">৳45,231.89</div>
              <p className="text-xs text-muted-foreground mt-2 font-medium flex gap-1">
                 <span className="text-green-500 font-bold">+20.1%</span> from last month
              </p>
           </div>
        </div>
        <div className="rounded-2xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
           <div className="flex justify-between items-center mb-4">
              <h3 className="tracking-tight text-sm font-medium">Total Orders</h3>
              <Activity className="w-5 h-5 text-muted-foreground" />
           </div>
           <div>
              <div className="text-3xl font-bold font-mono">+12,234</div>
              <p className="text-xs text-muted-foreground mt-2 font-medium flex gap-1">
                 <span className="text-green-500 font-bold">+19%</span> from last month
              </p>
           </div>
        </div>
        <div className="rounded-2xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
           <div className="flex justify-between items-center mb-4">
              <h3 className="tracking-tight text-sm font-medium">Sales</h3>
              <PackageOpen className="w-5 h-5 text-muted-foreground" />
           </div>
           <div>
              <div className="text-3xl font-bold font-mono">+5,342 kg</div>
              <p className="text-xs text-muted-foreground mt-2 font-medium flex gap-1">
                 <span className="text-red-500 font-bold">-2%</span> from last month
              </p>
           </div>
        </div>
        <div className="rounded-2xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
           <div className="flex justify-between items-center mb-4">
              <h3 className="tracking-tight text-sm font-medium">Active Farmers</h3>
              <Users className="w-5 h-5 text-muted-foreground" />
           </div>
           <div>
              <div className="text-3xl font-bold font-mono">+573</div>
              <p className="text-xs text-muted-foreground mt-2 font-medium flex gap-1">
                 <span className="text-green-500 font-bold">+21</span> since last week
              </p>
           </div>
        </div>
      </div>

      {/* Main Table / Recent Actions Area */}
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-8">
        <div className="xl:col-span-2 rounded-2xl border bg-card text-card-foreground shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b p-6 bg-muted/20">
             <div>
                <h3 className="text-lg font-bold">Recent Orders</h3>
                <p className="text-sm text-muted-foreground">Recent transactions from your store.</p>
             </div>
             <Link href="/admin/dashboard/orders" className="text-sm bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2 font-bold rounded-lg border border-primary/20">View All</Link>
          </div>
          <div className="p-6">
             <div className="relative w-full overflow-auto">
               <table className="w-full caption-bottom text-sm">
                 <thead className="[&_tr]:border-b">
                   <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                     <th className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground">Customer</th>
                     <th className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground hidden sm:table-cell">Type</th>
                     <th className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground hidden sm:table-cell">Status</th>
                     <th className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground hidden md:table-cell">Date</th>
                     <th className="h-12 px-4 text-right align-middle font-semibold text-muted-foreground">Amount</th>
                   </tr>
                 </thead>
                 <tbody className="[&_tr:last-child]:border-0">
                   {[
                     { name: "Rafiqul Islam", email: "rafiq@example.com", type: "Sale", status: "Fulfilled", date: "2024-05-15", amount: "৳2,450" },
                     { name: "Tahmina Begum", email: "tahmina@example.com", type: "Sale", status: "Processing", date: "2024-05-14", amount: "৳1,800" },
                     { name: "Faruk Hossain", email: "faruk@example.com", type: "Wholesale", status: "Shipped", date: "2024-05-14", amount: "৳15,400" },
                     { name: "Arif Rahaman", email: "arif@example.com", type: "Sale", status: "Fulfilled", date: "2024-05-12", amount: "৳3,600" },
                   ].map((order, i) => (
                      <tr key={i} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle">
                          <div className="font-semibold">{order.name}</div>
                          <div className="text-xs text-muted-foreground hidden sm:inline">{order.email}</div>
                        </td>
                        <td className="p-4 align-middle hidden sm:table-cell">{order.type}</td>
                        <td className="p-4 align-middle hidden sm:table-cell">
                           <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${order.status === 'Fulfilled' ? 'border-primary/50 text-primary bg-primary/10' : order.status === 'Processing' ? 'border-amber-500/50 text-amber-500 bg-amber-500/10' : 'border-blue-500/50 text-blue-500 bg-blue-500/10'}`}>
                             {order.status}
                           </span>
                        </td>
                        <td className="p-4 align-middle hidden md:table-cell text-muted-foreground">{order.date}</td>
                        <td className="p-4 align-middle text-right font-bold text-lg">{order.amount}</td>
                      </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card text-card-foreground shadow-sm overflow-hidden">
          <div className="border-b p-6 bg-muted/20">
             <h3 className="text-lg font-bold">Top Performing Mangoes</h3>
             <p className="text-sm text-muted-foreground">Products with most sales this week.</p>
          </div>
          <div className="p-6">
             <div className="grid gap-6">
                {[
                  { name: "Rajshahi Langra", sales: "245 kg", img: "https://images.unsplash.com/photo-1553279768-865429fd0079?w=100&q=80" },
                  { name: "Chapainawabganj Himsagar", sales: "189 kg", img: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=100&q=80" },
                  { name: "Dinajpur Fazli", sales: "102 kg", img: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=100&q=80" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-xl border overflow-hidden relative shadow-sm">
                       <Image src={item.img} alt={item.name} fill className="object-cover"/>
                     </div>
                     <div className="flex-1 space-y-1">
                        <p className="text-sm font-bold leading-none">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Premium Harvest</p>
                     </div>
                     <div className="font-bold border border-border px-3 py-1 rounded-lg text-sm bg-muted/30">
                        {item.sales}
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
