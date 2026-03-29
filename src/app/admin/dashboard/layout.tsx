import { Settings } from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/40 font-sans antialiased text-foreground">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex flex-col sm:gap-4 sm:pl-64 w-full h-full min-h-screen">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6 sm:static sm:border-0 sm:bg-transparent sm:px-8 pt-4">
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 justify-between">
            <h1 className="text-2xl font-bold hidden md:block">Dashboard Overview</h1>
            <div className="flex items-center gap-4 ml-auto">
               <button className="p-2 rounded-full bg-background border shadow-sm hover:bg-muted hidden md:flex"><Settings className="w-5 h-5"/></button>
               <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary border border-primary/30">A</div>
            </div>
          </div>
        </header>

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:px-8 mb-8 pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
