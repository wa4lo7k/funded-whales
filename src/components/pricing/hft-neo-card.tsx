"use client";

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { CrownIcon } from "@/components/icons/challenge-icons";

export interface HftNeoPricingCardProps {
  className?: string;
}

export function HftNeoPricingCard({ className = "" }: HftNeoPricingCardProps) {
  // Metrics data
  const metrics = [
    { label: "Profit Target", value: "8%" },
    { label: "Daily Drawdown", value: "5%" },
    { label: "Max Drawdown", value: "10%" },
    { label: "Profit Split", value: "Up to 90%" },
    { label: "Min Trading Days", value: "0" },
    { label: "Leverage", value: "1:100" },
  ];

  // Original and discounted prices
  const originalPrice = 23;
  const discountedPrice = 15;
  const discountPercentage = 30;
  const saveAmount = originalPrice - discountedPrice;

  return (
    <motion.div
      className={`relative rounded-lg overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {/* Background with purple gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 to-purple-800/20" />

      {/* Limited Time Offer badge */}
      <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg z-10">
        Limited Time Offer
      </div>

      <div className="relative h-full flex flex-col rounded-lg overflow-hidden border border-purple-500"
        style={{
          background: "var(--glass-background)",
          backdropFilter: "blur(var(--glass-blur))",
          WebkitBackdropFilter: "blur(var(--glass-blur))",
        }}
      >
        {/* Header with gradient */}
        <div
          className="p-6 pb-4"
          style={{
            background: "linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(126, 34, 206, 0.2))",
          }}
        >
          <div className="flex items-center mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
              style={{
                background: "linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(126, 34, 206, 0.3))",
              }}
            >
              <CrownIcon className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">HFT NEO</h3>
              <p className="text-sm text-muted-foreground">For elite traders seeking maximum performance</p>
            </div>
          </div>
        </div>

        {/* Card content */}
        <div className="p-6 flex-grow">
          {/* Price section */}
          <div className="mb-6">
            <div className="flex items-center mb-1">
              <span className="text-lg text-muted-foreground line-through mr-2">${originalPrice}</span>
              <span className="bg-orange-500/20 text-orange-500 text-xs font-semibold px-2 py-0.5 rounded">
                {discountPercentage}% OFF
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-green-500">${discountedPrice}</span>
              <span className="ml-2 text-sm text-muted-foreground">Save ${saveAmount}</span>
            </div>
          </div>

          {/* Metrics grid */}
          <div className="space-y-0">
            {metrics.map((metric, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-800/30">
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <span className="font-semibold">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="p-6 pt-0">
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            Get Started →
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
