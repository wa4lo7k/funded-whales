"use client";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Modern Web Application</span> with Glass-morphism
            </h1>
            <p className="text-lg mb-8 text-muted-foreground">
              Featuring Next.js, TypeScript, Tailwind CSS, shadcn/ui components, and Framer Motion animations with a beautiful glass-morphism design.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="glass-button bg-primary hover:bg-primary/90">
                Get Started
              </Button>
              <Button variant="outline" className="glass-button">
                Learn More
              </Button>
            </div>
          </motion.div>
          
          <div className="relative">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
            
            <GlassCard className="relative z-10">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold gradient-text">Glass-morphism UI</h2>
                <p>
                  Glass-morphism creates a frosted glass effect that adds depth and elegance to your UI components.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Transparent backgrounds
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Subtle blur effects
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Light border highlights
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Depth through layering
                  </li>
                </ul>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
