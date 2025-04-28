"use client";

import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { CHALLENGE_TYPES } from "@/config/challenge-types";

export function PricingCards() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-3 gap-8">
        {Object.entries(CHALLENGE_TYPES).map(([name, plan], index) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-2xl bg-gradient-to-b ${plan.color} p-0.5`}
          >
            <div className="h-full rounded-2xl bg-slate-900 p-6 backdrop-blur-3xl">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <plan.icon className="h-6 w-6" />
                  <h3 className="text-xl font-semibold text-white">{name}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-400">{plan.description}</p>
              </div>

              {/* Pricing Grid */}
              <div className="space-y-4">
                {Object.entries(plan.prices).map(([size, price]) => (
                  <div key={size} className="relative rounded-lg bg-slate-800/50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-white">{size}</span>
                      <div className="text-right">
                        <span className="text-sm line-through text-gray-500">{price}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-white">
                            {plan.salePrice[size]}
                          </span>
                          <Badge variant="default" className="bg-green-500/20 text-green-400">
                            {plan.discountPercentage[size]}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-300">
                    <Check className="mr-2 h-4 w-4 text-blue-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button 
                className="mt-8 w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                Start Challenge
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
