"use client";

import { HeroSectionNew } from "@/components/sections/landing/hero-section-new";
import { WhyFundedWhales } from "@/components/sections/why-funded-whales";
import { Testimonials } from "@/components/sections/landing/testimonials";
import { MarketOverview } from "@/components/sections/landing/market-overview";
import { CTASection } from "@/components/sections/landing/cta-section";
import { EnhancedPricingCards } from "@/components/pricing/enhanced-pricing-cards";

import { JoinFundedWhales } from "@/components/sections/join-funded-whales";
import { FAQSection } from "@/components/sections/faq/faq-section";
import { ScrollAnimationInitializer } from "@/components/scroll-animation-initializer";
import Link from "next/link";

// Import custom CSS for How It Works section
import "@/app/how-it-works.css";

export default function HomePage() {
  return (
    <>
      {/* Initialize scroll animations */}
      <ScrollAnimationInitializer />

      {/* Style Demo Link */}
      <div className="fixed bottom-4 right-4 z-50">
        <Link
          href="/style-demo"
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm"
        >
          Try New Styles ✨
        </Link>
      </div>

      {/* Home Section */}
      <section id="home">
        <HeroSectionNew />
      </section>


      {/* Why Us Section */}
      <section id="why-us" className="py-12">
        <WhyFundedWhales />
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 gradient-text-violet-pink fade-in-up-v2">
            Pricing
          </h2>
          <div className="fade-in-up-v2 animate-delay-200">
            <EnhancedPricingCards />
          </div>
        </div>
      </section>

      {/* Join Funded Whales Section */}
      <section id="join-us">
        <JoinFundedWhales />
      </section>

      {/* Testimonials Section */}
      <section className="py-12">
        <Testimonials />
      </section>

      {/* Market Overview Section */}
      <section className="py-12">
        <MarketOverview />
      </section>


      {/* FAQ Section */}
      <section id="faq">
        <FAQSection />
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] to-[#0891b2] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 gradient-text-deep-blue-aqua fade-in-up-v3">
            How It Works
          </h2>
          <div className="w-full mx-auto">
            {/* Flexbox container for horizontal layout with wrapping */}
            <div className="how-it-works-container">
              {/* Item 1 */}
              <div className="glass-card-modern-v3 p-6 fade-in-up-v3 animate-delay-100 how-it-works-card how-it-works-card-1">
                <h3 className="text-xl font-semibold mb-4 gradient-text-deep-blue-aqua">1. Choose Your Challenge</h3>
                <p className="text-muted-foreground">
                  Select from our range of trading challenges based on your experience level and capital requirements.
                  We offer account sizes from $1,000 to $500,000 with competitive profit splits.
                </p>
              </div>

              {/* Item 2 */}
              <div className="glass-card-modern-v3 p-6 fade-in-up-v3 animate-delay-200 how-it-works-card how-it-works-card-2">
                <h3 className="text-xl font-semibold mb-4 gradient-text-deep-blue-aqua">2. Pass the Challenge</h3>
                <p className="text-muted-foreground">
                  Demonstrate your trading skills by meeting the profit target while adhering to our risk management rules.
                  There's no time limit, allowing you to trade at your own pace.
                </p>
              </div>

              {/* Item 3 */}
              <div className="glass-card-modern-v3 p-6 fade-in-up-v3 animate-delay-300 how-it-works-card how-it-works-card-3">
                <h3 className="text-xl font-semibold mb-4 gradient-text-deep-blue-aqua">3. Get Funded</h3>
                <p className="text-muted-foreground">
                  Once you pass the challenge, you'll receive a funded account with real capital.
                  Start trading immediately and keep up to 90% of the profits you generate.
                </p>
              </div>

              {/* Item 4 */}
              <div className="glass-card-modern-v3 p-6 fade-in-up-v3 animate-delay-400 how-it-works-card how-it-works-card-4">
                <h3 className="text-xl font-semibold mb-4 gradient-text-deep-blue-aqua">4. Scale Your Account</h3>
                <p className="text-muted-foreground">
                  As you demonstrate consistent profitability, you'll have opportunities to scale your account size,
                  increasing your earning potential and trading capital.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  );
}
