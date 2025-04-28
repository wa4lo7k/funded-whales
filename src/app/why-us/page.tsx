import { WhyFundedWhales } from "@/components/sections/why-funded-whales";
import { CTASection } from "@/components/sections/landing/cta-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Choose Us | Funded Whales Trading Challenges",
  description: "Discover why Funded Whales is the premier choice for funded trading accounts. Learn about our rapid funding, high profit splits, and 24/7 support.",
};

export default function WhyUsPage() {
  return (
    <div>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Why Choose Funded Whales</h1>
          <p className="text-lg text-muted-foreground">
            We're committed to providing traders with the best possible experience and opportunities for success.
            Discover the advantages that set us apart from other proprietary trading firms.
          </p>
        </div>
      </div>

      <WhyFundedWhales />

      <div className="py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-center">Our Commitment to Traders</h2>
            <p className="mb-6 text-center text-muted-foreground">
              At Funded Dolphin, we believe in creating a supportive environment where traders can thrive.
              Our platform is designed with your success in mind, offering the tools, resources, and capital you need to reach your full potential.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-border/50 rounded-lg">
                <h3 className="font-semibold mb-2">Transparent Evaluation Process</h3>
                <p className="text-sm text-muted-foreground">
                  Our challenge evaluation process is clear and straightforward, with no hidden rules or conditions.
                  What you see is what you get.
                </p>
              </div>

              <div className="p-4 border border-border/50 rounded-lg">
                <h3 className="font-semibold mb-2">Realistic Trading Conditions</h3>
                <p className="text-sm text-muted-foreground">
                  We provide real market conditions during challenges and funded accounts, ensuring a seamless transition between evaluation and live trading.
                </p>
              </div>

              <div className="p-4 border border-border/50 rounded-lg">
                <h3 className="font-semibold mb-2">Educational Resources</h3>
                <p className="text-sm text-muted-foreground">
                  Access a wealth of educational materials, webinars, and trading insights to help you improve your skills and strategy.
                </p>
              </div>

              <div className="p-4 border border-border/50 rounded-lg">
                <h3 className="font-semibold mb-2">Community Support</h3>
                <p className="text-sm text-muted-foreground">
                  Join a community of like-minded traders who share insights, strategies, and support each other on their trading journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
}
