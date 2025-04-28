"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Clock,
  Target,
  TrendingDown,
  Percent,
  BarChart4,
  Calendar,
  DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskRuleProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  className?: string;
}

const RiskRule = ({ icon, title, description, delay = 0, className }: RiskRuleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.3 }
      }}
      className={cn(
        "relative overflow-hidden rounded-xl backdrop-blur-sm border border-border/50 shadow-sm transition-all duration-300",
        className
      )}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-50" />
      
      {/* Content */}
      <div className="relative p-6">
        <motion.div
          className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4"
          whileHover={{
            rotate: [0, 10, -10, 0],
            scale: 1.05,
            transition: { duration: 0.5 }
          }}
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-semibold mb-2 gradient-text">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

export function RiskManagementRules() {
  const rules = [
    {
      icon: <BarChart3 className="w-6 h-6 text-primary" />,
      title: "Daily Drawdown",
      description: "Maximum 5% loss allowed in a single trading day",
    },
    {
      icon: <TrendingDown className="w-6 h-6 text-primary" />,
      title: "Max Drawdown",
      description: "Overall account drawdown limited to 10%",
    },
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "Profit Target",
      description: "8-10% profit target depending on challenge type",
    },
    {
      icon: <BarChart4 className="w-6 h-6 text-primary" />,
      title: "Leverage Limits",
      description: "Maximum leverage of 1:100 on major pairs",
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Min Trading Days",
      description: "Minimum 5 trading days required for most challenges",
    },
    {
      icon: <Percent className="w-6 h-6 text-primary" />,
      title: "Profit Split",
      description: "Up to 90% profit sharing on funded accounts",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Risk Management Rules</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive risk management framework ensures sustainable trading success and account protection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rules.map((rule, index) => (
            <RiskRule
              key={rule.title}
              icon={rule.icon}
              title={rule.title}
              description={rule.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
