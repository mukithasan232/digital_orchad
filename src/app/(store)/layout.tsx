import { Header } from "@/frontend/components/layout/Header";
import { Footer } from "@/frontend/components/layout/Footer";
import { AnimationProvider } from "@/frontend/components/AnimationProvider";
import { BackgroundAnimation } from "@/frontend/components/BackgroundAnimation";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimationProvider>
      <BackgroundAnimation />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </AnimationProvider>
  );
}
