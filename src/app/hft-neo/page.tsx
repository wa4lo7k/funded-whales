import { Header } from "@/components/layout/header";
import { HftNeoPricingCard } from "@/components/pricing/hft-neo-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HFT NEO Challenge | Funded Whales",
  description: "Elite trading challenge for maximum performance with Funded Whales",
};

export default function HftNeoPage() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">HFT NEO Challenge</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our most advanced trading challenge for elite traders seeking maximum performance.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <HftNeoPricingCard />
        </div>
      </main>
    </div>
  );
}
