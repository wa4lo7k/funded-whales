"use client";

import { GlassCard, GlassCardWithGradientBorder } from "@/components/ui/glass-card";
import { motion } from "framer-motion";

const features = [
  {
    title: "Blue/Aqua Accents",
    description: "Custom color palette with beautiful blue and aqua accent colors for a modern look.",
    icon: "🎨"
  },
  {
    title: "Dark Theme",
    description: "Fully customized dark theme with proper color contrast and glass-morphism effects.",
    icon: "🌙"
  },
  {
    title: "Background Gradient",
    description: "Subtle background gradient that changes based on the selected theme.",
    icon: "🌈"
  },
  {
    title: "Glass-morphism",
    description: "Beautiful glass-morphism effects for cards, buttons, and UI components.",
    icon: "✨"
  }
];

export function Features() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="gradient-text">Custom Styling</span> Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the custom styling features implemented in this project, including Tailwind CSS configuration, custom colors, and glass-morphism effects.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <GlassCardWithGradientBorder key={index} delay={index * 0.1} className="h-full">
              <div className="flex flex-col h-full">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground flex-grow">{feature.description}</p>
              </div>
            </GlassCardWithGradientBorder>
          ))}
        </div>
      </div>
    </section>
  );
}
