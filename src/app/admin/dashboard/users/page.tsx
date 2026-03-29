import { BadgeCheck, Search, SlidersHorizontal, UserPlus, MoreVertical } from "lucide-react";
import Image from "next/image";

export default function AdminUsersPage() {
  const users = [
    {
      id: 1,
      name: "Tariqul Islam",
      email: "tariqul.rajshahi@example.com",
      role: "Farmer",
      status: "Verified",
      joined: "2024-01-12",
      avatar: "https://i.pravatar.cc/150?img=11",
      sales: "1,204 kg",
    },
    {
      id: 2,
      name: "Nasir Uddin",
      email: "nasir.uddin@example.com",
      role: "Customer",
      status: "Active",
      joined: "2024-03-24",
      avatar: "https://i.pravatar.cc/150?img=12",
      sales: "-",
    },
    {
      id: 3,
      name: "Abdul Karim Orchards",
      email: "karim.mangofarm@example.com",
      role: "Farmer",
      status: "Verified",
      joined: "2023-11-05",
      avatar: "https://i.pravatar.cc/150?img=14",
      sales: "3,450 kg",
    },
    {
      id: 4,
      name: "Salma Begum",
      email: "salma.b@example.com",
      role: "Customer",
      status: "Inactive",
      joined: "2024-04-10",
      avatar: "https://i.pravatar.cc/150?img=5",
      sales: "-",
    },
    {
      id: 5,
      name: "Admin Team",
      email: "admin@digitalorchard.com.bd",
      role: "Admin",
      status: "Active",
      joined: "2023-01-01",
      avatar: "https://i.pravatar.cc/150?img=68",
      sales: "-",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users & Farmers</h2>
          <p className="text-muted-foreground mt-1">Manage platform accounts, verify orchard farmers, and review customer data.</p>
        </div>
        <button className="bg-primary text-primary-foreground font-bold px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-sm border border-primary/20">
          <UserPlus className="w-5 h-5" />
          Add User
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm"
            placeholder="Search users by name, email, or role..."
          />
        </div>
        <button className="px-4 py-2 border border-border rounded-xl bg-background hover:bg-muted transition-colors flex items-center gap-2 text-sm font-semibold shadow-sm">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b bg-muted/20">
              <tr className="border-b transition-colors">
                <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground">Profile</th>
                <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground">Role</th>
                <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground">Status</th>
                <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground hidden md:table-cell">Joined</th>
                <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground hidden lg:table-cell">Total Sales</th>
                <th className="h-12 px-6 text-right align-middle font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0 divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="transition-colors hover:bg-muted/30">
                  <td className="p-6 align-middle">
                    <div className="flex items-center gap-4">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden border">
                        <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground text-sm flex items-center gap-1">
                          {user.name} 
                          {user.status === 'Verified' && <BadgeCheck className="w-4 h-4 text-primary fill-primary/10" />}
                        </span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 align-middle">
                     <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                        user.role === 'Admin' ? 'bg-red-500/10 text-red-600 border border-red-500/20' : 
                        user.role === 'Farmer' ? 'bg-primary/10 text-primary border border-primary/20' : 
                        'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                     }`}>
                       {user.role}
                     </span>
                  </td>
                  <td className="p-6 align-middle">
                     <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${user.status === 'Active' || user.status === 'Verified' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span className="text-sm font-medium">{user.status}</span>
                     </div>
                  </td>
                  <td className="p-6 align-middle hidden md:table-cell text-muted-foreground text-sm">
                    {user.joined}
                  </td>
                  <td className="p-6 align-middle hidden lg:table-cell font-mono text-sm">
                    {user.sales !== "-" ? user.sales : <span className="text-muted-foreground">—</span>}
                  </td>
                  <td className="p-6 align-middle text-right">
                    <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground" aria-label="More actions">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination Mockup */}
      <div className="flex items-center justify-between mt-6 text-sm text-muted-foreground">
         <p>Showing 1 to 5 of 45 entries</p>
         <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-border rounded-lg hover:bg-muted disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 bg-primary/10 text-primary font-bold border border-primary/20 rounded-lg">1</button>
            <button className="px-3 py-1.5 border border-border rounded-lg hover:bg-muted">2</button>
            <button className="px-3 py-1.5 border border-border rounded-lg hover:bg-muted">3</button>
            <button className="px-3 py-1.5 border border-border rounded-lg hover:bg-muted">Next</button>
         </div>
      </div>
    </div>
  );
}
