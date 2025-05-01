import { FAQSection } from "@/components/sections/faq/faq-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Funded Whales Trading Challenges",
  description: "Find answers to common questions about our trading challenges, rules, profit sharing, and account protection. Get the information you need to start your funded trading journey.",
};

export default function FAQPage() {
  return (
    <div className="pt-24">
      <FAQSection />
    </div>
  );
}
