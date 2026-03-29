"use client";

import { useState } from "react";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [stockStatus, setStockStatus] = useState<null | 'available' | 'out_of_stock'>(null);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    
    // Simulate Supabase real-time stock verification
    // const { data, error } = await supabase.from('products').select('stock_kg').eq('id', productId).single();
    
    setTimeout(() => {
       setStockStatus('available');
       setIsVerifying(false);
       // redirect to SSLCommerz or Stripe gateway
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-5xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Checkout Form */}
        <div className="flex-1 bg-card rounded-3xl p-8 border border-border shadow-sm">
          <h1 className="text-3xl font-extrabold mb-6">Secure Checkout</h1>
          <form onSubmit={handleCheckout} className="space-y-6">
             <div className="space-y-4">
               <h3 className="font-bold text-lg border-b pb-2">1. Shipping Details</h3>
               <div className="grid grid-cols-2 gap-4">
                 <input type="text" placeholder="First Name" required className="w-full px-4 py-3 border rounded-xl bg-muted/30 focus:bg-background" />
                 <input type="text" placeholder="Last Name" required className="w-full px-4 py-3 border rounded-xl bg-muted/30 focus:bg-background" />
               </div>
               <input type="email" placeholder="Email Address" required className="w-full px-4 py-3 border rounded-xl bg-muted/30 focus:bg-background" />
               <input type="text" placeholder="Detailed Address (House, Road, Area, District)" required className="w-full px-4 py-3 border rounded-xl bg-muted/30 focus:bg-background" />
               <input type="tel" placeholder="Mobile Number (e.g., +880)" required className="w-full px-4 py-3 border rounded-xl bg-muted/30 focus:bg-background" />
             </div>

             <div className="space-y-4 pt-4">
               <h3 className="font-bold text-lg border-b pb-2">2. Payment Method</h3>
               <div className="flex flex-col gap-3">
                 <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-primary">
                    <input type="radio" name="payment" value="cod" className="text-primary w-5 h-5 focus:ring-primary" defaultChecked />
                    <span className="font-medium">Cash on Delivery (Outside Dhaka takes 3 days)</span>
                 </label>
                 <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-primary">
                    <input type="radio" name="payment" value="ssl" className="text-primary w-5 h-5 focus:ring-primary" />
                    <span className="font-medium">SSLCommerz (bKash, Nagad, Visa, DBBL)</span>
                 </label>
               </div>
             </div>

             {stockStatus === 'out_of_stock' && (
               <div className="p-4 bg-red-50 text-red-600 rounded-xl font-medium border border-red-200">
                  ⚠️ Some items are out of stock. Please adjust your cart.
               </div>
             )}

             <button disabled={isVerifying} className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all flex justify-center items-center gap-2 shadow-lg disabled:opacity-70">
                {isVerifying ? "Verifying Stock & Connecting Gateway..." : "Proceed to Payment"}
                {!isVerifying && <ArrowRight className="w-5 h-5" />}
             </button>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full md:w-96 space-y-6">
           <div className="bg-muted/30 rounded-3xl p-6 border border-border">
              <h3 className="font-bold text-xl mb-4">Order Summary</h3>
              <div className="flex flex-col gap-4 mb-6">
                 {/* Mock Item */}
                 <div className="flex justify-between items-center">
                    <div>
                       <h4 className="font-bold text-sm">Premium Rajshahi Langra</h4>
                       <p className="text-xs text-muted-foreground">Qty: 10 kg</p>
                    </div>
                    <span className="font-bold text-sm">৳1,200</span>
                 </div>
              </div>
              
              <div className="space-y-2 border-t pt-4 text-sm">
                 <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-bold">৳1,200</span></div>
                 <div className="flex justify-between"><span className="text-muted-foreground">Shipping (All BD)</span><span className="font-bold">৳150</span></div>
                 <div className="flex justify-between pt-2 border-t text-base"><span className="font-bold">Total</span><span className="font-extrabold text-primary text-lg">৳1,350</span></div>
              </div>
           </div>

           <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-4 bg-background border rounded-xl shadow-sm">
                 <ShieldCheck className="w-6 h-6 text-green-500" />
                 <div><h4 className="font-bold text-sm">Buyer Protection</h4><p className="text-xs text-muted-foreground">Full refund if product is damaged.</p></div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-background border rounded-xl shadow-sm">
                 <Lock className="w-6 h-6 text-primary" />
                 <div><h4 className="font-bold text-sm">SSL Secured Payment</h4><p className="text-xs text-muted-foreground">Your financial details are encrypted.</p></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
