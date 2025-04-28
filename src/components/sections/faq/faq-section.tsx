"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

// FAQ items for each category
const hftItems = [
  {
    title: "Trading Rules & Permissions",
    content: "High-Frequency Trading (HFT) is permitted on our platform with certain limitations. You may use automated trading systems and algorithms, but they must comply with our risk management rules. Maximum order frequency is limited to 100 orders per minute to prevent server overload. All HFT strategies must maintain the maximum drawdown limits specified in your challenge type."
  },
  {
    title: "High-Frequency Trading (HFT) Policy",
    content: "Our HFT policy allows for algorithmic trading with proper risk controls. Your algorithms must not manipulate the market or create excessive server load. We monitor all HFT activity to ensure fair trading practices. Violation of these policies may result in account termination."
  },
  {
    title: "KYC Verification Requirements",
    content: "For HFT traders, we require standard KYC verification plus additional documentation. This includes proof of identity (passport or government ID), proof of address (utility bill or bank statement less than 3 months old), and a brief description of your trading strategy. HFT traders may also need to provide information about their trading infrastructure."
  },
  {
    title: "Profit Sharing Structure",
    content: "HFT traders receive the same profit sharing structure as manual traders. This ranges from 80% to 90% depending on your challenge type. Profit withdrawals for HFT accounts are processed within 24-48 hours after request. There are no additional fees for HFT trading."
  },
  {
    title: "Trading Activity Requirement",
    content: "HFT accounts must maintain consistent trading activity. We require at least 5 trading days per month with a minimum of 10 trades per active day. Inactivity for more than 30 consecutive days may result in account review. HFT strategies should demonstrate consistent methodology rather than sporadic patterns."
  }
];

const phase1Items = [
  {
    title: "Trading Rules & Permissions",
    content: "During Phase 1 of the challenge, you must achieve the profit target without exceeding the maximum drawdown limit. Trading is allowed on all provided instruments including Forex, Indices, Commodities, and Cryptocurrencies. News trading is permitted, but we recommend caution during high-impact economic events."
  },
  {
    title: "EA (Expert Advisor) or High-Frequency Trading (HFT) Policy",
    content: "Expert Advisors (EAs) and algorithmic trading are permitted in Phase 1. Your EA must comply with our risk management rules and trading conditions. We monitor EA performance to ensure compliance with our trading policies. All automated strategies must maintain the maximum drawdown limits specified in your challenge type."
  },
  {
    title: "KYC Verification Requirements",
    content: "Basic KYC verification is required before starting Phase 1. This includes proof of identity (passport or government ID) and proof of address (utility bill or bank statement less than 3 months old). Verification is typically completed within 24 hours. You can begin trading immediately after purchasing the challenge."
  },
  {
    title: "Profit Sharing Structure",
    content: "There is no profit sharing during Phase 1 as this is an evaluation period. All profit targets must be met within the specified timeframe (typically 30 days, but varies by challenge type). The profit target ranges from 8% to 10% depending on your chosen challenge."
  },
  {
    title: "Trading Activity Requirement",
    content: "Phase 1 requires a minimum of 5 trading days within the challenge period. A trading day is defined as any day where at least one trade is opened and closed. There is no minimum trade requirement, but your trading should demonstrate a consistent strategy rather than lucky trades or excessive risk-taking."
  }
];

const phase2Items = [
  {
    title: "Trading Rules & Permissions",
    content: "Phase 2 maintains the same trading rules as Phase 1, but with a funded account. You must achieve the profit target (typically 5% for Phase 2) without exceeding the maximum drawdown limit. All trading platforms and instruments available in Phase 1 remain accessible. Once you complete Phase 2, you'll receive a fully funded account."
  },
  {
    title: "EA (Expert Advisor) or High-Frequency Trading (HFT) Policy",
    content: "The same EA and HFT policies from Phase 1 apply to Phase 2. Your automated trading systems must continue to comply with our risk management framework. We encourage consistent trading methodology between phases to demonstrate strategy reliability."
  },
  {
    title: "KYC Verification Requirements",
    content: "No additional KYC is required for Phase 2 if you've already completed verification during Phase 1. Your existing verification will carry over. For traders who need to update their information, our compliance team is available to assist."
  },
  {
    title: "Profit Sharing Structure",
    content: "Upon successful completion of Phase 2, profit sharing begins with your first profitable trade in the funded account. The profit split ranges from 80% to 90% based on your challenge type, with higher-tier accounts receiving more favorable splits. Profit withdrawals can be requested once per month."
  },
  {
    title: "Trading Activity Requirement",
    content: "Phase 2 requires the same minimum trading activity as Phase 1 (minimum 5 trading days). Once you receive your funded account after Phase 2, you must maintain at least 5 active trading days per month. Inactivity for more than 30 consecutive days may result in account review."
  }
];

export function FAQSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1e3a8a] to-[#0891b2] opacity-5"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 fade-in-up-v3">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text-deep-blue-aqua">
            Frequently Asked Questions
          </h2>
          <p className="text-lg max-w-2xl mx-auto font-medium">
            WE MADE GETTING FUNDED EASIER FOR EVERYONE
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* HFT Rules Column */}
          <div className="fade-in-up-v3 animate-delay-100">
            <h3 className="text-xl font-semibold gradient-text-deep-blue-aqua mb-4 text-center">HFT Rules</h3>
            <div className="space-y-4 glass-card-modern-v3 p-4">
              {hftItems.map((item, index) => (
                <CustomAccordionItem
                  key={`hft-${index}`}
                  title={item.title}
                  content={item.content}
                />
              ))}
            </div>
          </div>

          {/* Phase 1 Rules Column */}
          <div className="fade-in-up-v3 animate-delay-200">
            <h3 className="text-xl font-semibold gradient-text-deep-blue-aqua mb-4 text-center">Phase 1 Rules</h3>
            <div className="space-y-4 glass-card-modern-v3 p-4">
              {phase1Items.map((item, index) => (
                <CustomAccordionItem
                  key={`phase1-${index}`}
                  title={item.title}
                  content={item.content}
                />
              ))}
            </div>
          </div>

          {/* Phase 2 Rules Column */}
          <div className="fade-in-up-v3 animate-delay-300">
            <h3 className="text-xl font-semibold gradient-text-deep-blue-aqua mb-4 text-center">Phase 2 Rules</h3>
            <div className="space-y-4 glass-card-modern-v3 p-4">
              {phase2Items.map((item, index) => (
                <CustomAccordionItem
                  key={`phase2-${index}`}
                  title={item.title}
                  content={item.content}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Custom accordion item component to match the design
function CustomAccordionItem({ title, content }: { title: string; content: string }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={title} className="border-0">
        <AccordionTrigger className="bg-gradient-to-r from-[#1e3a8a] to-[#0891b2] backdrop-blur-sm rounded-lg px-4 py-3 text-sm font-medium text-left hover:opacity-90 transition-all">
          {title}
        </AccordionTrigger>
        <AccordionContent>
          <div className="bg-white/10 backdrop-blur-sm px-4 py-3 text-sm rounded-b-lg mt-1 border border-white/10">
            {content}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
