"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const challenges = [
  {
    name: "Starter",
    price: "$99",
    account: "$10,000",
    profitTarget: "8%",
    maxDrawdown: "5%",
    profitShare: "80%",
    features: [
      "Unlimited trading time",
      "One-time fee",
      "Forex, Indices, Commodities",
      "Weekend holding allowed",
      "Scaling opportunities",
      "Real-time dashboard",
    ],
  },
  {
    name: "Advanced",
    price: "$199",
    account: "$25,000",
    profitTarget: "8%",
    maxDrawdown: "5%",
    profitShare: "85%",
    popular: true,
    features: [
      "Unlimited trading time",
      "One-time fee",
      "Forex, Indices, Commodities",
      "Weekend holding allowed",
      "Scaling opportunities",
      "Real-time dashboard",
      "Priority support",
    ],
  },
  {
    name: "Professional",
    price: "$399",
    account: "$50,000",
    profitTarget: "8%",
    maxDrawdown: "5%",
    profitShare: "90%",
    features: [
      "Unlimited trading time",
      "One-time fee",
      "All trading instruments",
      "Weekend holding allowed",
      "Scaling opportunities",
      "Real-time dashboard",
      "Priority support",
      "1-on-1 coaching session",
    ],
  },
];

export function TradingChallenges() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-[#8FD9E2]">Trading Challenges</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the challenge that fits your trading style and goals.
              Pass the challenge and get funded with our capital.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className={`glass-card h-full flex flex-col ${
                challenge.popular ? 'border-2 border-[#5A7682]' : ''
              }`}>
                {challenge.popular && (
                  <div className="absolute top-0 right-0 bg-[#5A7682] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-6 flex-grow">
                  <h3 className="text-2xl font-bold mb-2">{challenge.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-[#8FD9E2]">{challenge.price}</span>
                    <span className="text-muted-foreground"> one-time fee</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#5A7682]/20 p-3 rounded-lg text-center">
                      <div className="text-sm text-muted-foreground">Account Size</div>
                      <div className="text-xl font-bold">{challenge.account}</div>
                    </div>
                    <div className="bg-[#5A7682]/20 p-3 rounded-lg text-center">
                      <div className="text-sm text-muted-foreground">Profit Share</div>
                      <div className="text-xl font-bold">{challenge.profitShare}</div>
                    </div>
                    <div className="bg-[#5A7682]/20 p-3 rounded-lg text-center">
                      <div className="text-sm text-muted-foreground">Profit Target</div>
                      <div className="text-xl font-bold">{challenge.profitTarget}</div>
                    </div>
                    <div className="bg-[#5A7682]/20 p-3 rounded-lg text-center">
                      <div className="text-sm text-muted-foreground">Max Drawdown</div>
                      <div className="text-xl font-bold">{challenge.maxDrawdown}</div>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {challenge.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-[#8FD9E2] shrink-0 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 pt-0">
                  <Button
                    className={`w-full ${challenge.popular ? 'bg-[#5A7682] hover:bg-[#4a6270]' : 'border-[#5A7682]/30 hover:bg-[#5A7682]/10'}`}
                    variant={challenge.popular ? 'default' : 'outline'}
                  >
                    Start Challenge
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
