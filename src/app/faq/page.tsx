import { FAQSection } from "@/components/sections/faq/faq-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Funded Whales Trading Challenges",
  description: "Find answers to common questions about our trading challenges, rules, and funded accounts. Learn about HFT rules, Phase 1 and Phase 2 requirements.",
};

export default function FAQPage() {
  return (
    <div className="pt-24">
      <FAQSection />
    </div>
  );
}
