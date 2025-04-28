"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CrownIcon, WhaleIcon, AnchorIcon } from "@/components/icons/challenge-icons";
import styles from "./enhanced-pricing-cards.module.css";

// Challenge data for different account sizes
const accountSizes = [
  "$1,000", "$3,000", "$5,000", "$10,000", "$25,000",
  "$50,000", "$100,000", "$200,000", "$500,000"
];

// Challenge details for each account size
const challengeDetails = {
  "$1,000": {
    title: "Starter Challenge",
    details: {
      accountSize: "$1,000",
      profitTarget: "8%",
      maxDailyLoss: "3%",
      maxTotalLoss: "6%",
      payoutRatio: "75%",
      leverage: "1:30"
    },
    description: "Best for beginners to practice funded trading.",
    popular: false,
    price: 49,
    originalPrice: 69,
  },
  "$3,000": {
    title: "Beginner Plus Challenge",
    details: {
      accountSize: "$3,000",
      profitTarget: "8%",
      maxDailyLoss: "3%",
      maxTotalLoss: "6%",
      payoutRatio: "75%",
      leverage: "1:30"
    },
    description: "Slightly larger account for steady growth.",
    popular: false,
    price: 79,
    originalPrice: 99,
  },
  "$5,000": {
    title: "Growth Starter",
    details: {
      accountSize: "$5,000",
      profitTarget: "8%",
      maxDailyLoss: "4%",
      maxTotalLoss: "8%",
      payoutRatio: "80%",
      leverage: "1:50"
    },
    description: "Ideal for serious traders ready to scale.",
    popular: false,
    price: 89,
    originalPrice: 119,
  },
  "$10,000": {
    title: "Popular Trader Challenge",
    details: {
      accountSize: "$10,000",
      profitTarget: "8%",
      maxDailyLoss: "4%",
      maxTotalLoss: "8%",
      payoutRatio: "80%",
      leverage: "1:50"
    },
    description: "Most chosen plan for career traders!",
    popular: true,
    price: 99,
    originalPrice: 149,
  },
  "$25,000": {
    title: "Advanced Trader Challenge",
    details: {
      accountSize: "$25,000",
      profitTarget: "10%",
      maxDailyLoss: "5%",
      maxTotalLoss: "10%",
      payoutRatio: "80%",
      leverage: "1:50"
    },
    description: "More capital, more flexibility.",
    popular: false,
    price: 199,
    originalPrice: 299,
  },
  "$50,000": {
    title: "Professional Trader Challenge",
    details: {
      accountSize: "$50,000",
      profitTarget: "10%",
      maxDailyLoss: "5%",
      maxTotalLoss: "10%",
      payoutRatio: "85%",
      leverage: "1:50"
    },
    description: "Massive growth potential with bigger rewards.",
    popular: true,
    price: 399,
    originalPrice: 499,
  },
  "$100,000": {
    title: "Elite Trader Challenge",
    details: {
      accountSize: "$100,000",
      profitTarget: "10%",
      maxDailyLoss: "5%",
      maxTotalLoss: "10%",
      payoutRatio: "85%",
      leverage: "1:50"
    },
    description: "For elite and experienced traders.",
    popular: false,
    price: 599,
    originalPrice: 799,
  },
  "$200,000": {
    title: "Master Trader Challenge",
    details: {
      accountSize: "$200,000",
      profitTarget: "10%",
      maxDailyLoss: "5%",
      maxTotalLoss: "10%",
      payoutRatio: "85%",
      leverage: "1:30"
    },
    description: "Trade like a true professional.",
    popular: false,
    price: 899,
    originalPrice: 1299,
  },
  "$500,000": {
    title: "Legend Trader Challenge",
    details: {
      accountSize: "$500,000",
      profitTarget: "10%",
      maxDailyLoss: "5%",
      maxTotalLoss: "10%",
      payoutRatio: "90%",
      leverage: "1:30"
    },
    description: "Ultimate funding experience for the best traders.",
    popular: false,
    price: 1999,
    originalPrice: 2999,
  },
};

// Common features for all challenges
const commonFeatures = [
  "Unlimited trading time",
  "One-time fee",
  "Forex, Indices, Commodities",
  "Weekend holding allowed",
  "Scaling opportunities",
  "Real-time dashboard",
];

export function EnhancedPricingCards() {
  const [selectedSize, setSelectedSize] = useState("$1,000");

  // Get challenge details for the selected size
  const selectedChallenge = challengeDetails[selectedSize];

  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((selectedChallenge.originalPrice - selectedChallenge.price) / selectedChallenge.originalPrice) * 100
  );

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-8">
          Choose Your Challenge
        </h3>

        {/* Account Size Selector */}
        <div className={styles.sizeSelector}>
          {accountSizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`${styles.sizeButton} ${
                selectedSize === size
                  ? styles.sizeButtonActive
                  : styles.sizeButtonInactive
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* HFT NEO Special Card */}
      <div className="mb-12 max-w-md mx-auto">
        <motion.div
          className="relative rounded-lg overflow-hidden"
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
                  <span className="text-lg text-muted-foreground line-through mr-2">$23</span>
                  <span className="bg-orange-500/20 text-orange-500 text-xs font-semibold px-2 py-0.5 rounded">
                    30% OFF
                  </span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-green-500">$15</span>
                  <span className="ml-2 text-sm text-muted-foreground">Save $8</span>
                </div>
              </div>

              {/* Metrics grid */}
              <div className="space-y-0">
                <div className="flex justify-between items-center py-2 border-b border-gray-800/30">
                  <span className="text-sm text-muted-foreground">Profit Target</span>
                  <span className="font-semibold">8%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800/30">
                  <span className="text-sm text-muted-foreground">Daily Drawdown</span>
                  <span className="font-semibold">5%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800/30">
                  <span className="text-sm text-muted-foreground">Max Drawdown</span>
                  <span className="font-semibold">10%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800/30">
                  <span className="text-sm text-muted-foreground">Profit Split</span>
                  <span className="font-semibold">Up to 90%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800/30">
                  <span className="text-sm text-muted-foreground">Min Trading Days</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800/30">
                  <span className="text-sm text-muted-foreground">Leverage</span>
                  <span className="font-semibold">1:100</span>
                </div>
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
      </div>

      <div className="text-center mb-8">
        <h3 className="text-xl md:text-2xl font-bold">
          Standard Trading Challenges
        </h3>
      </div>

      {/* Challenge Cards */}
      <div className={styles.cardGrid}>
        {/* We'll display 3 variations of the selected challenge */}
        {[0, 1, 2].map((variation) => {
          // Adjust some properties based on variation to create different options
          const challenge = { ...selectedChallenge };

          // Variation 0: Standard (default)
          // Variation 1: Express (faster, higher price)
          // Variation 2: Evaluation (two-phase, lower price)

          let title = challenge.title;
          let price = challenge.price;
          let originalPrice = challenge.originalPrice;
          let popular = challenge.popular;
          let description = challenge.description;
          let additionalFeatures = [];

          if (variation === 1) {
            title = `Express ${challenge.title}`;
            price = Math.round(challenge.price * 1.2);
            originalPrice = Math.round(challenge.originalPrice * 1.2);
            popular = selectedSize === "$50,000"; // Make Express popular for $50k
            description = "Fast-track evaluation with higher profit targets";
            additionalFeatures = ["Faster evaluation", "Higher profit targets", "Priority support"];
          } else if (variation === 2) {
            title = `Evaluation ${challenge.title}`;
            price = Math.round(challenge.price * 0.9);
            originalPrice = Math.round(challenge.originalPrice * 0.9);
            popular = selectedSize === "$10,000"; // Make Evaluation popular for $10k
            description = "Two-phase evaluation with lower risk";
            additionalFeatures = ["Two-phase evaluation", "Lower risk parameters", "Extended time limit"];
          }

          // Calculate discount for this variation
          const variationDiscount = Math.round(
            ((originalPrice - price) / originalPrice) * 100
          );

          // Combine features
          const features = [...commonFeatures, ...additionalFeatures];

          // Get the appropriate icon and colors based on variation
          let Icon = WhaleIcon;
          let gradientFrom = "#0ea5e9"; // Sky blue
          let gradientTo = "#06b6d4"; // Cyan
          let buttonColor = "bg-blue-600 hover:bg-blue-700";
          let borderColor = "border-blue-500";

          if (variation === 1) {
            Icon = AnchorIcon;
            gradientFrom = "#6366f1"; // Indigo
            gradientTo = "#8b5cf6"; // Violet
            buttonColor = "bg-indigo-600 hover:bg-indigo-700";
            borderColor = "border-indigo-500";
          } else if (variation === 2) {
            Icon = CrownIcon;
            gradientFrom = "#8b5cf6"; // Violet
            gradientTo = "#a855f7"; // Purple
            buttonColor = "bg-purple-600 hover:bg-purple-700";
            borderColor = "border-purple-500";
          }

          // Calculate discount percentage
          const discountPercentage = Math.round(
            ((originalPrice - price) / originalPrice) * 100
          );

          // Metrics data for this challenge
          const metrics = [
            { label: "Account Size", value: challenge.details.accountSize },
            { label: "Profit Target", value: challenge.details.profitTarget },
            { label: "Daily Drawdown", value: challenge.details.maxDailyLoss },
            { label: "Max Drawdown", value: challenge.details.maxTotalLoss },
            { label: "Profit Split", value: challenge.details.payoutRatio },
            { label: "Leverage", value: challenge.details.leverage },
          ];

          return (
            <motion.div
              key={`${selectedSize}-${variation}`}
              className="relative rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: variation * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Background with gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-b opacity-20"
                style={{
                  background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`
                }}
              />

              {/* Badges */}
              {popular && (
                <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg z-10">
                  MOST POPULAR
                </div>
              )}

              {variation === 1 && !popular && (
                <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg z-10">
                  EXPRESS
                </div>
              )}

              {variation === 2 && !popular && (
                <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg z-10">
                  EVALUATION
                </div>
              )}

              {/* Left side badge for variation type when card is also popular */}
              {variation === 1 && popular && (
                <div className="absolute top-0 left-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-lg z-10">
                  EXPRESS
                </div>
              )}

              {variation === 2 && popular && (
                <div className="absolute top-0 left-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-lg z-10">
                  EVALUATION
                </div>
              )}

              <div
                className={`relative h-full flex flex-col rounded-lg overflow-hidden border ${borderColor}`}
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
                    background: `linear-gradient(135deg, ${gradientFrom}15, ${gradientTo}15)`,
                  }}
                >
                  <div className="flex items-center mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                      style={{
                        background: `linear-gradient(135deg, ${gradientFrom}30, ${gradientTo}30)`,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{title}</h3>
                      <p className="text-sm text-muted-foreground">{description}</p>
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
                      <span className="text-4xl font-bold text-green-500">${price}</span>
                      <span className="ml-2 text-sm text-muted-foreground">Save ${originalPrice - price}</span>
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
                    className={`w-full text-white ${buttonColor}`}
                  >
                    Get Started →
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
