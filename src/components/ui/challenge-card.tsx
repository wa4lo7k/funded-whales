"use client";

import { AnchorIcon, CompassIcon, CrownIcon, WhaleIcon, WaveIcon } from "@/components/icons/challenge-icons";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { ReactNode } from "react";

export type ChallengeType = "whale-hunter" | "deep-ocean" | "blue-whale";

export interface ChallengeFeature {
  name: string;
  included: boolean;
}

export interface ChallengeCardProps {
  type: ChallengeType;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  accountSize: string;
  profitTarget: string;
  maxDrawdown: string;
  profitShare: string;
  features: ChallengeFeature[];
  popular?: boolean;
  className?: string;
}

const challengeConfig = {
  "whale-hunter": {
    icon: WhaleIcon,
    gradientFrom: "#0ea5e9", // Sky blue
    gradientTo: "#06b6d4", // Cyan
    iconColor: "#0ea5e9",
  },
  "deep-ocean": {
    icon: AnchorIcon,
    gradientFrom: "#6366f1", // Indigo
    gradientTo: "#8b5cf6", // Violet
    iconColor: "#6366f1",
  },
  "blue-whale": {
    icon: CrownIcon,
    gradientFrom: "#0284c7", // Blue
    gradientTo: "#0891b2", // Cyan
    iconColor: "#0284c7",
  },
};

export function ChallengeCard({
  type,
  name,
  description,
  originalPrice,
  discountedPrice,
  accountSize,
  profitTarget,
  maxDrawdown,
  profitShare,
  features,
  popular = false,
  className = "",
}: ChallengeCardProps) {
  const config = challengeConfig[type];
  const Icon = config.icon;
  const discount = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div
        className="absolute inset-0 rounded-lg opacity-10"
        style={{
          background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
        }}
      />
      <div
        className={`relative h-full flex flex-col rounded-lg overflow-hidden border ${
          popular ? "border-2 border-primary" : "border-[var(--glass-border)]"
        }`}
        style={{
          background: "var(--glass-background)",
          backdropFilter: "blur(var(--glass-blur))",
          WebkitBackdropFilter: "blur(var(--glass-blur))",
        }}
      >
        {popular && (
          <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg z-10">
            MOST POPULAR
          </div>
        )}

        {/* Header with gradient */}
        <div
          className="p-6 pb-4"
          style={{
            background: `linear-gradient(135deg, ${config.gradientFrom}15, ${config.gradientTo}15)`,
          }}
        >
          <div className="flex items-center mb-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
              style={{
                background: `linear-gradient(135deg, ${config.gradientFrom}30, ${config.gradientTo}30)`,
              }}
            >
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{name}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        </div>

        <div className="p-6 pt-2 flex-grow">
          {/* Price section */}
          <div className="mb-6">
            <div className="flex items-center">
              <span className="text-3xl font-bold">${discountedPrice}</span>
              {originalPrice > discountedPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through ml-2">
                    ${originalPrice}
                  </span>
                  <span className="ml-2 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium px-2 py-1 rounded">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>
            <span className="text-sm text-muted-foreground">one-time fee</span>
          </div>

          {/* Challenge details */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div
              className="p-3 rounded-lg text-center"
              style={{
                background: `linear-gradient(135deg, ${config.gradientFrom}10, ${config.gradientTo}10)`,
              }}
            >
              <div className="text-sm text-muted-foreground">Account Size</div>
              <div className="text-xl font-bold">{accountSize}</div>
            </div>
            <div
              className="p-3 rounded-lg text-center"
              style={{
                background: `linear-gradient(135deg, ${config.gradientFrom}10, ${config.gradientTo}10)`,
              }}
            >
              <div className="text-sm text-muted-foreground">Profit Share</div>
              <div className="text-xl font-bold">{profitShare}</div>
            </div>
            <div
              className="p-3 rounded-lg text-center"
              style={{
                background: `linear-gradient(135deg, ${config.gradientFrom}10, ${config.gradientTo}10)`,
              }}
            >
              <div className="text-sm text-muted-foreground">Profit Target</div>
              <div className="text-xl font-bold">{profitTarget}</div>
            </div>
            <div
              className="p-3 rounded-lg text-center"
              style={{
                background: `linear-gradient(135deg, ${config.gradientFrom}10, ${config.gradientTo}10)`,
              }}
            >
              <div className="text-sm text-muted-foreground">Max Drawdown</div>
              <div className="text-xl font-bold">{maxDrawdown}</div>
            </div>
          </div>

          {/* Features list */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Challenge Features</h4>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  {feature.included ? (
                    <Check
                      className="h-5 w-5 text-green-500 shrink-0 mr-2"
                      style={{ color: config.iconColor }}
                    />
                  ) : (
                    <X className="h-5 w-5 text-red-500 shrink-0 mr-2" />
                  )}
                  <span className={feature.included ? "" : "text-muted-foreground"}>
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Button */}
        <div className="p-6 pt-0">
          <Button
            className="w-full"
            style={{
              background: popular
                ? `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`
                : "transparent",
              color: popular ? "white" : "inherit",
              border: popular ? "none" : "1px solid var(--border)",
            }}
          >
            Start Challenge
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
