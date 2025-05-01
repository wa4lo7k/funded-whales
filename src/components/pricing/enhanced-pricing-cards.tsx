"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CrownIcon, WhaleIcon, AnchorIcon } from "@/components/icons/challenge-icons";
import styles from "./enhanced-pricing-cards.module.css";

// Challenge data for different account sizes
const accountSizes = [
  "$1,000", "$3,000", "$5,000", "$10,000", "$25,000", "$50,000", "$100,000", "$200,000", "$500,000"
];

// Challenge details for each account size - FundingPips One-Step Evaluation model
const challengeDetails = {
  "$1,000": {
    title: "Student",
    details: {
      accountSize: "$1,000",
      profitTarget: "10%",
      maxDailyLoss: "4%",
      maxTotalLoss: "6%",
      payoutRatio: "75%",
      leverage: "1:50"
    },
    description: "Perfect for beginners learning to trade.",
    popular: false,
    price: 29,
    originalPrice: 39,
  },
  "$3,000": {
    title: "Student",
    details: {
      accountSize: "$3,000",
      profitTarget: "10%",
      maxDailyLoss: "4%",
      maxTotalLoss: "6%",
      payoutRatio: "75%",
      leverage: "1:50"
    },
    description: "Perfect for beginners learning to trade.",
    popular: false,
    price: 49,
    originalPrice: 69,
  },
  "$5,000": {
    title: "Student",
    details: {
      accountSize: "$5,000",
      profitTarget: "10%",
      maxDailyLoss: "4%",
      maxTotalLoss: "6%",
      payoutRatio: "75%",
      leverage: "1:50"
    },
    description: "Perfect for beginners learning to trade.",
    popular: false,
    price: 59,
    originalPrice: 79,
  },
  "$10,000": {
    title: "Student",
    details: {
      accountSize: "$10,000",
      profitTarget: "10%",
      maxDailyLoss: "4%",
      maxTotalLoss: "6%",
      payoutRatio: "75%",
      leverage: "1:50"
    },
    description: "Perfect for beginners learning to trade.",
    popular: true,
    price: 99,
    originalPrice: 129,
  },
  "$25,000": {
    title: "Practitioner",
    details: {
      accountSize: "$25,000",
      profitTarget: "10%",
      maxDailyLoss: "4%",
      maxTotalLoss: "6%",
      payoutRatio: "80%",
      leverage: "1:50"
    },
    description: "For experienced traders ready to grow.",
    popular: false,
    price: 199,
    originalPrice: 249,
  },
  "$50,000": {
    title: "Practitioner",
    details: {
      accountSize: "$50,000",
      profitTarget: "10%",
      maxDailyLoss: "4%",
      maxTotalLoss: "6%",
      payoutRatio: "80%",
      leverage: "1:50"
    },
    description: "For experienced traders ready to grow.",
    popular: true,
    price: 299,
    originalPrice: 399,
  },
  "$100,000": {
    title: "Master",
    details: {
      accountSize: "$100,000",
      profitTarget: "10%",
      maxDailyLoss: "4%",
      maxTotalLoss: "6%",
      payoutRatio: "85%",
      leverage: "1:50"
    },
    description: "For professional traders seeking excellence.",
    popular: false,
    price: 499,
    originalPrice: 699,
  },
  "$200,000": {
    title: "Master",
    details: {
      accountSize: "$200,000",
      profitTarget: "10%",
      maxDailyLoss: "4%",
      maxTotalLoss: "6%",
      payoutRatio: "85%",
      leverage: "1:50"
    },
    description: "For professional traders seeking excellence.",
    popular: false,
    price: 799,
    originalPrice: 999,
  },
  "$500,000": {
    title: "Master",
    details: {
      accountSize: "$500,000",
      profitTarget: "10%",
      maxDailyLoss: "4%",
      maxTotalLoss: "6%",
      payoutRatio: "90%",
      leverage: "1:50"
    },
    description: "For professional traders seeking excellence.",
    popular: false,
    price: 1499,
    originalPrice: 1999,
  }
};

// Challenge types
const challengeTypes = ["Instant", "1 step", "2 step"];

// Common features for different challenge types
const commonFeaturesByType = {
  "Instant": [
    "Instant funding",
    "One-time fee",
    "Forex, Indices, Commodities",
    "Weekend holding allowed",
    "Real-time dashboard",
  ],
  "1 step": [
    "One-step evaluation process",
    "One-time fee",
    "Forex, Indices, Commodities",
    "Weekend holding allowed",
    "10% profit target",
    "Real-time dashboard",
  ],
  "2 step": [
    "Two-step evaluation process",
    "One-time fee",
    "Forex, Indices, Commodities",
    "Weekend holding allowed",
    "8% profit target per phase",
    "Real-time dashboard",
  ]
};

export function EnhancedPricingCards() {
  const [selectedSize, setSelectedSize] = useState("$10,000");
  const [selectedChallengeType, setSelectedChallengeType] = useState("2 step");

  // Get challenge details for the selected size
  const selectedChallenge = challengeDetails[selectedSize];

  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((selectedChallenge.originalPrice - selectedChallenge.price) / selectedChallenge.originalPrice) * 100
  );

  // Get features for the selected challenge type
  const commonFeatures = commonFeaturesByType[selectedChallengeType];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Choose Your Challenge
        </h3>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto mb-8">
          Select your challenge type and account size
        </p>

        {/* Challenge Type Selector */}
        <div className={styles.challengeTypeSelector}>
          {challengeTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedChallengeType(type)}
              className={`${styles.challengeTypeButton} ${
                selectedChallengeType === type
                  ? styles.challengeTypeButtonActive
                  : styles.challengeTypeButtonInactive
              }`}
            >
              {type}
            </button>
          ))}
        </div>

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

      {/* Challenge Cards */}
      <div className={styles.cardGrid}>
        {/* We'll display 3 variations of the selected challenge */}
        {[0, 1, 2].map((variation) => {
          // Adjust some properties based on variation to create different options
          const challenge = { ...selectedChallenge };

          // Variation 0: Student
          // Variation 1: Practitioner
          // Variation 2: Master

          let title = challenge.title;
          let price = challenge.price;
          let originalPrice = challenge.originalPrice;
          let popular = challenge.popular;
          let description = challenge.description;
          let additionalFeatures = [];

          // Adjust price based on challenge type
          let priceMultiplier = 1.0;
          if (selectedChallengeType === "Instant") {
            priceMultiplier = 1.5; // Instant funding is more expensive
          } else if (selectedChallengeType === "1 step") {
            priceMultiplier = 1.2; // One-step is slightly more expensive than two-step
          } else if (selectedChallengeType === "2 step") {
            priceMultiplier = 1.0; // Two-step is the base price
          }

          // Set specific plan titles and pricing for each variation regardless of selected account size
          if (variation === 0) {
            title = "Student";
            // Student plan is always the most affordable
            price = Math.round(challenge.price * priceMultiplier);
            originalPrice = Math.round(challenge.originalPrice * priceMultiplier);
            popular = selectedSize === "$10,000"; // Make Student popular for $10k
            description = "Perfect for beginners learning to trade.";
            additionalFeatures = ["Beginner-friendly interface", "Basic educational resources", "Community forum access"];

            // Special case for $100K account
            if (selectedSize === "$100,000") {
              price = Math.round(449 * priceMultiplier);
              originalPrice = Math.round(599 * priceMultiplier);
            }
          } else if (variation === 1) {
            title = "Practitioner";
            // Practitioner plan is mid-range
            price = Math.round(challenge.price * 1.1 * priceMultiplier);
            originalPrice = Math.round(challenge.originalPrice * 1.1 * priceMultiplier);
            popular = selectedSize === "$50,000"; // Make Practitioner popular for $50k
            description = "For experienced traders ready to grow.";
            additionalFeatures = ["Priority support", "Advanced trading analytics", "Weekly market insights"];

            // Special case for $100K account
            if (selectedSize === "$100,000") {
              price = Math.round(499 * priceMultiplier);
              originalPrice = Math.round(649 * priceMultiplier);
            }
          } else if (variation === 2) {
            title = "Master";
            // Master plan is premium
            price = Math.round(challenge.price * 1.2 * priceMultiplier);
            originalPrice = Math.round(challenge.originalPrice * 1.2 * priceMultiplier);
            popular = false;
            description = "For professional traders seeking excellence.";
            additionalFeatures = ["VIP support", "Premium analytics", "One-on-one coaching session"];

            // Special case for $100K account
            if (selectedSize === "$100,000") {
              price = Math.round(599 * priceMultiplier);
              originalPrice = Math.round(799 * priceMultiplier);
            }
          }

          // Calculate discount for this variation
          const variationDiscount = Math.round(
            ((originalPrice - price) / originalPrice) * 100
          );

          // Combine features
          const features = [...commonFeatures, ...additionalFeatures];

          // Get the appropriate icon based on plan type
          let Icon = WhaleIcon;
          let buttonColor = "bg-gray-600 hover:bg-gray-700";
          let borderColor = "border-gray-500";

          if (variation === 0) {
            // Student plan
            Icon = WhaleIcon;
            buttonColor = "bg-gray-600 hover:bg-gray-700";
            borderColor = "border-gray-500";
          } else if (variation === 1) {
            // Practitioner plan
            Icon = AnchorIcon;
            buttonColor = "bg-gray-600 hover:bg-gray-700";
            borderColor = "border-gray-500";
          } else if (variation === 2) {
            // Master plan
            Icon = CrownIcon;
            buttonColor = "bg-gray-600 hover:bg-gray-700";
            borderColor = "border-gray-500";
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
              {/* Background */}
              <div className="absolute inset-0 bg-gray-800/20" />

              {/* Badges */}
              {popular && (
                <div className="absolute top-0 right-0 bg-gray-700 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg z-10">
                  MOST POPULAR
                </div>
              )}

              {variation === 0 && !popular && (
                <div className="absolute top-0 right-0 bg-gray-700 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg z-10">
                  BEGINNER
                </div>
              )}

              {variation === 1 && !popular && (
                <div className="absolute top-0 right-0 bg-gray-700 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg z-10">
                  INTERMEDIATE
                </div>
              )}

              {variation === 2 && !popular && (
                <div className="absolute top-0 right-0 bg-gray-700 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg z-10">
                  ADVANCED
                </div>
              )}

              {/* Left side badge for variation type when card is also popular */}
              {variation === 0 && popular && (
                <div className="absolute top-0 left-0 bg-gray-700 text-white text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-lg z-10">
                  BEGINNER
                </div>
              )}

              {variation === 1 && popular && (
                <div className="absolute top-0 left-0 bg-gray-700 text-white text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-lg z-10">
                  INTERMEDIATE
                </div>
              )}

              {variation === 2 && popular && (
                <div className="absolute top-0 left-0 bg-gray-700 text-white text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-lg z-10">
                  ADVANCED
                </div>
              )}

              <div
                className={`relative h-full flex flex-col rounded-lg overflow-hidden border ${borderColor} bg-card/50 backdrop-blur-sm`}
              >
                {/* Header */}
                <div
                  className="p-6 pb-4 bg-gray-800/10"
                >
                  <div className="flex items-center mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-gray-700/20"
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
                      <span className="bg-gray-700/30 text-gray-300 text-xs font-semibold px-2 py-0.5 rounded">
                        {discountPercentage}% OFF
                      </span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-white">${price}</span>
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
