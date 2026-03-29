import { CreditCard } from "lucide-react";

export default function AdminPaymentsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
       <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-6">
          <CreditCard className="w-10 h-10" />
       </div>
       <h2 className="text-3xl font-bold tracking-tight mb-2">Payments & Invoices</h2>
       <p className="text-muted-foreground max-w-md">This module is under construction. Soon you can track SSLCommerz and bKash payments securely.</p>
    </div>
  );
}
