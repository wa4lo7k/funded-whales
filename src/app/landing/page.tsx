import { Navbar } from "@/components/layout/navbar";
import { CTASection } from "@/components/sections/landing/cta-section";
import { HeroSectionNew } from "@/components/sections/landing/hero-section-new";
import { MarketOverview } from "@/components/sections/landing/market-overview";
import { MarketTicker } from "@/components/sections/landing/market-ticker";
import { Testimonials } from "@/components/sections/landing/testimonials";
import { TradingChallenges } from "@/components/sections/landing/trading-challenges";
import { WhyFundedWhales } from "@/components/sections/why-funded-whales";
import { RiskManagementRules } from "@/components/sections/risk-management-rules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Funded Whales Trading Challenges & Funded Accounts",
  description: "Take your trading to the next level with Funded Whales' trading challenges and funded accounts. Prove your skills and get access to professional capital.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />

      <main>
        <HeroSectionNew />
        <MarketTicker />
        <TradingChallenges />
        <WhyFundedWhales />
        <RiskManagementRules />
        <Testimonials />
        <MarketOverview />
        <CTASection />
      </main>

      <footer className="py-8 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Funded Whales. All rights reserved.</p>
          <div className="flex gap-6 justify-center mt-4">
            <a
              className="hover:text-primary transition-colors"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="hover:text-primary transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="hover:text-primary transition-colors"
              href="#"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
