"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState, Suspense, useRef } from "react";
import dynamic from "next/dynamic";

// Import the bubbles component with no SSR to avoid hydration mismatch
const BubblesClient = dynamic(
  () => import("./bubbles").then(mod => mod.Bubbles),
  { ssr: false, loading: () => null }
);

export function HeroSectionNew() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-play video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Custom whale background video */}
      <div className="absolute inset-0 z-0">
        {/* Video background with parallax effect */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          <video
            ref={videoRef}
            className="absolute w-full h-full object-cover opacity-60"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/whale-background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* Dark gradient overlay for better text readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Bubbles - Client-side only component to avoid hydration mismatch */}
        <Suspense fallback={null}>
          <BubblesClient />
        </Suspense>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white font-[family-name:var(--font-space-grotesk)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Built by traders{" "}
            <motion.span
              className="text-primary inline-block"
              animate={{
                x: [0, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1
              }}
            >
              ➔
            </motion.span>{" "}
            for traders.
          </motion.h1>
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Join over 1,000,000 traders in the world's leading proprietary trading firm.
            Trade in a fully simulated environment with your favorite platforms and earn
            up to 90% profit splits with zero reward denials.
          </p>
          <Button
            className="bg-gradient-to-r from-primary to-accent text-white text-lg px-10 py-7 rounded-lg hover:from-primary-dark hover:to-accent-dark transition-all duration-300 shadow-lg hover:shadow-xl font-[family-name:var(--font-space-grotesk)] font-bold tracking-wide"
          >
            BUY CHALLENGE
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
