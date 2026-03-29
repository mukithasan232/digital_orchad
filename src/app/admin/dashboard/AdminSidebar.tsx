"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Copy, CreditCard, LayoutDashboard, Package, ShoppingCart, Users, LogOut } from "lucide-react";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/dashboard/products", label: "Products", icon: Package },
  { href: "/admin/dashboard/users", label: "Users & Farmers", icon: Users },
  { href: "/admin/dashboard/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/dashboard/content", label: "Content (Blog)", icon: Copy },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:scale-105 transition-transform">
          🥭 Orchard Admin
        </Link>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto w-full">
        <nav className="grid gap-2 px-4 py-6 text-sm font-medium w-full">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 w-full hover:bg-primary/5 hover:text-primary ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-md translate-x-1"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t">
        <Link
          href="/auth"
          className="flex items-center gap-3 rounded-lg text-red-500 hover:bg-red-500 hover:text-white hover:shadow-lg px-3 py-2 transition-all font-medium duration-300"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          Sign Out
        </Link>
      </div>
    </aside>
  );
}
