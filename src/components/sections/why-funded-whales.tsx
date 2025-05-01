"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck, DollarSign, BarChart4, Award,
  ShieldCheck, Zap, Eye, BanknoteIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  className?: string;
}

const Benefit = ({ icon, title, description, delay = 0, className }: BenefitProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)",
        transition: { duration: 0.3 }
      }}
      className={cn(
        "flex flex-col items-center text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm transition-all duration-300 h-full",
        className
      )}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4"
        whileHover={{
          rotate: [0, 10, -10, 0],
          transition: { duration: 0.5 }
        }}
      >
        {icon}
      </motion.div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export function WhyFundedWhales() {
  const benefits = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "No Reward Denial",
      description: "Trade with full confidence. We ensure that every earned reward is rightfully and promptly given without unnecessary hurdles.",
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Your Favorite Platform",
      description: "Stay where you trade best. FundedWhales supports MetaTrader 5, cTrader, and Match-Trader for seamless performance.",
    },
    {
      icon: <Eye className="w-6 h-6 text-primary" />,
      title: "No Hidden Rules",
      description: "Transparency at its core. What you see is what you get — no secret clauses, no unfair conditions.",
    },
    {
      icon: <BanknoteIcon className="w-6 h-6 text-primary" />,
      title: "Smooth Withdrawals",
      description: "Your profits, your pocket. Fast and hassle-free withdrawals so you can enjoy your success without waiting.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "Risk Management",
      description: "Trade with peace of mind knowing our platform implements robust risk management protocols to protect your capital.",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-primary" />,
      title: "High Profit Split",
      description: "Enjoy up to 90% profit sharing, one of the highest in the industry, allowing you to maximize your trading returns.",
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Rapid Funding",
      description: "Get funded quickly after passing our challenge. No long waiting periods - start trading with real capital within 24 hours.",
    },
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: "Scaling Opportunities",
      description: "Grow your account size through our scaling program as you demonstrate consistent profitability and responsible trading.",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-primary/5 to-background/0 pointer-events-none" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5 pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why FundedWhales?</h2>
          <p className="text-lg text-muted-foreground">
            Join the elite community of funded traders and experience the advantages that set us apart in the industry.
          </p>
        </motion.div>

        <div className="flex flex-row flex-wrap justify-center gap-6">
          {benefits.map((benefit, index) => (
            <Benefit
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              delay={index * 0.1}
              className="flex-1 min-w-[250px]"
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-6 bg-primary/10 px-4 py-2 rounded-full">
            <BadgeCheck className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Trusted by professional traders worldwide</span>
          </div>

          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="flex items-center gap-2">
              <BarChart4 className="w-5 h-5 text-primary" />
              <span className="font-semibold">$25M+</span>
              <span className="text-sm text-muted-foreground">Trading Capital</span>
            </div>

            <div className="w-px h-8 bg-border/50" />

            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <span className="font-semibold">$2.5M+</span>
              <span className="text-sm text-muted-foreground">Profit Paid</span>
            </div>

            <div className="w-px h-8 bg-border/50" />

            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <span className="font-semibold">5,000+</span>
              <span className="text-sm text-muted-foreground">Funded Traders</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
