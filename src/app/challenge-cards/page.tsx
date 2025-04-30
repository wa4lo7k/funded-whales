import { Header } from "@/components/layout/header";
import { ChallengeCard, ChallengeFeature } from "@/components/ui/challenge-card";
import { ChallengeCardAdvanced } from "@/components/ui/challenge-card-advanced";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Challenge Cards | Funded Whales",
  description: "Trading challenge options with Funded Whales",
};

// Sample challenge data
const whaleHunterFeatures: ChallengeFeature[] = [
  { name: "Unlimited trading time", included: true },
  { name: "One-time fee", included: true },
  { name: "Forex & Indices", included: true },
  { name: "Weekend holding allowed", included: true },
  { name: "Scaling opportunities", included: true },
  { name: "Real-time dashboard", included: true },
  { name: "Priority support", included: false },
  { name: "1-on-1 coaching session", included: false },
];

const deepOceanFeatures: ChallengeFeature[] = [
  { name: "Unlimited trading time", included: true },
  { name: "One-time fee", included: true },
  { name: "Forex, Indices & Commodities", included: true },
  { name: "Weekend holding allowed", included: true },
  { name: "Scaling opportunities", included: true },
  { name: "Real-time dashboard", included: true },
  { name: "Priority support", included: true },
  { name: "1-on-1 coaching session", included: false },
];

const blueWhaleFeatures: ChallengeFeature[] = [
  { name: "Unlimited trading time", included: true },
  { name: "One-time fee", included: true },
  { name: "All trading instruments", included: true },
  { name: "Weekend holding allowed", included: true },
  { name: "Scaling opportunities", included: true },
  { name: "Real-time dashboard", included: true },
  { name: "Priority support", included: true },
  { name: "1-on-1 coaching session", included: true },
];

// Advanced features with tooltips
const whaleHunterAdvancedFeatures = [
  { name: "Unlimited trading time", included: true, tooltip: "No time limit to complete the challenge" },
  { name: "One-time fee", included: true, tooltip: "Pay once, no monthly subscription" },
  { name: "Forex & Indices", included: true, tooltip: "Trade major and minor currency pairs and global indices" },
  { name: "Weekend holding allowed", included: true, tooltip: "Keep positions open over the weekend" },
  { name: "Scaling opportunities", included: true, tooltip: "Increase your account size after successful trading" },
  { name: "Real-time dashboard", included: true, tooltip: "Monitor your performance with detailed analytics" },
  { name: "Priority support", included: false, tooltip: "Get faster responses from our support team" },
  { name: "1-on-1 coaching session", included: false, tooltip: "Personal coaching with professional traders" },
];

const deepOceanAdvancedFeatures = [
  { name: "Unlimited trading time", included: true, tooltip: "No time limit to complete the challenge" },
  { name: "One-time fee", included: true, tooltip: "Pay once, no monthly subscription" },
  { name: "Forex, Indices & Commodities", included: true, tooltip: "Trade a wider range of instruments including commodities" },
  { name: "Weekend holding allowed", included: true, tooltip: "Keep positions open over the weekend" },
  { name: "Scaling opportunities", included: true, tooltip: "Increase your account size after successful trading" },
  { name: "Real-time dashboard", included: true, tooltip: "Monitor your performance with detailed analytics" },
  { name: "Priority support", included: true, tooltip: "Get faster responses from our support team" },
  { name: "1-on-1 coaching session", included: false, tooltip: "Personal coaching with professional traders" },
];

const blueWhaleAdvancedFeatures = [
  { name: "Unlimited trading time", included: true, tooltip: "No time limit to complete the challenge" },
  { name: "One-time fee", included: true, tooltip: "Pay once, no monthly subscription" },
  { name: "All trading instruments", included: true, tooltip: "Access to all available trading instruments including crypto" },
  { name: "Weekend holding allowed", included: true, tooltip: "Keep positions open over the weekend" },
  { name: "Scaling opportunities", included: true, tooltip: "Increase your account size after successful trading" },
  { name: "Real-time dashboard", included: true, tooltip: "Monitor your performance with detailed analytics" },
  { name: "Priority support", included: true, tooltip: "Get faster responses from our support team" },
  { name: "1-on-1 coaching session", included: true, tooltip: "Personal coaching with professional traders" },
];

export default function ChallengeCardsPage() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Trading Challenge Cards</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reusable challenge card components with different styles and features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <ChallengeCard
            type="whale-hunter"
            name="Whale Hunter"
            description="Entry level challenge for new traders"
            originalPrice={149}
            discountedPrice={99}
            accountSize="$10,000"
            profitTarget="8%"
            maxDrawdown="5%"
            profitShare="80%"
            features={whaleHunterFeatures}
          />

          <ChallengeCard
            type="deep-ocean"
            name="Deep Ocean"
            description="Intermediate challenge for experienced traders"
            originalPrice={299}
            discountedPrice={199}
            accountSize="$25,000"
            profitTarget="8%"
            maxDrawdown="5%"
            profitShare="85%"
            features={deepOceanFeatures}
            popular={true}
          />

          <ChallengeCard
            type="blue-whale"
            name="Blue Whale"
            description="Advanced challenge for professional traders"
            originalPrice={499}
            discountedPrice={399}
            accountSize="$50,000"
            profitTarget="8%"
            maxDrawdown="5%"
            profitShare="90%"
            features={blueWhaleFeatures}
          />
        </div>

        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-6 text-center">Individual Cards</h2>

          <div className="max-w-md mx-auto mb-12">
            <ChallengeCard
              type="whale-hunter"
              name="Whale Hunter"
              description="Entry level challenge for new traders"
              originalPrice={149}
              discountedPrice={99}
              accountSize="$10,000"
              profitTarget="8%"
              maxDrawdown="5%"
              profitShare="80%"
              features={whaleHunterFeatures}
            />
          </div>

          <div className="max-w-md mx-auto mb-12">
            <ChallengeCard
              type="deep-ocean"
              name="Deep Ocean"
              description="Intermediate challenge for experienced traders"
              originalPrice={299}
              discountedPrice={199}
              accountSize="$25,000"
              profitTarget="8%"
              maxDrawdown="5%"
              profitShare="85%"
              features={deepOceanFeatures}
              popular={true}
            />
          </div>

          <div className="max-w-md mx-auto">
            <ChallengeCard
              type="blue-whale"
              name="Blue Whale"
              description="Advanced challenge for professional traders"
              originalPrice={499}
              discountedPrice={399}
              accountSize="$50,000"
              profitTarget="8%"
              maxDrawdown="5%"
              profitShare="90%"
              features={blueWhaleFeatures}
            />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Advanced Challenge Cards</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
            Enhanced version with tooltips, interactive effects, and additional features
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ChallengeCardAdvanced
              type="whale-hunter"
              name="Whale Hunter"
              description="Entry level challenge for new traders"
              originalPrice={149}
              discountedPrice={99}
              accountSize="$10,000"
              profitTarget="8%"
              maxDrawdown="5%"
              profitShare="80%"
              features={whaleHunterAdvancedFeatures}
              badge="BEGINNER"
              timeLeft="2 days"
            />

            <ChallengeCardAdvanced
              type="deep-ocean"
              name="Deep Ocean"
              description="Intermediate challenge for experienced traders"
              originalPrice={299}
              discountedPrice={199}
              accountSize="$25,000"
              profitTarget="8%"
              maxDrawdown="5%"
              profitShare="85%"
              features={deepOceanAdvancedFeatures}
              popular={true}
              badge="BEST VALUE"
            />

            <ChallengeCardAdvanced
              type="blue-whale"
              name="Blue Whale"
              description="Advanced challenge for professional traders"
              originalPrice={499}
              discountedPrice={399}
              accountSize="$50,000"
              profitTarget="8%"
              maxDrawdown="5%"
              profitShare="90%"
              features={blueWhaleAdvancedFeatures}
              badge="EXPERT"
              timeLeft="5 days"
            />
          </div>
        </div>


      </main>

      <footer className="py-8 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Funded Whales. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
