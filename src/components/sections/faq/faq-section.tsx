"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  BarChart,
  Shield,
  DollarSign,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  className?: string;
}

const FAQCard = ({ icon, title, description, delay = 0, className }: FAQCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 0 20px rgba(78, 174, 187, 0.4)",
        transition: { duration: 0.3 }
      }}
      className={cn(
        "flex flex-col items-center text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm transition-all duration-300 h-full min-h-[250px] justify-between",
        className
      )}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4"
          whileHover={{
            rotate: [0, 10, -10, 0],
            transition: { duration: 0.5 }
          }}
        >
          {icon}
        </motion.div>
        <h3 className="text-lg font-semibold mb-2 gradient-text-deep-blue-aqua">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export function FAQSection() {
  const faqCards = [
    {
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      title: "Trading Rules",
      description: "Our trading rules are designed to be fair and transparent. We allow all trading styles including scalping, day trading, and swing trading. News trading is permitted with proper risk management.",
    },
    {
      icon: <BarChart className="w-6 h-6 text-primary" />,
      title: "Challenge Structure",
      description: "Our two-phase evaluation process is designed to identify skilled traders. Pass both phases by meeting profit targets while adhering to risk management rules to receive a funded account.",
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Account Protection",
      description: "We prioritize account security with advanced encryption and multi-factor authentication. Your personal and financial information is always protected with industry-leading security measures.",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-primary" />,
      title: "Profit Sharing",
      description: "Enjoy up to 90% profit sharing with fast, hassle-free withdrawals. Profit splits are paid promptly with no hidden fees or complicated withdrawal processes.",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1e3a8a] to-[#0891b2] opacity-5"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text-deep-blue-aqua">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our trading challenges and funded accounts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {faqCards.map((card, index) => (
            <FAQCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              delay={index * 0.1}
              className="w-full h-full"
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
            <HelpCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Need more help? Contact our support team</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
