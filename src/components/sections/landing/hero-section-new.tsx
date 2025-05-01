"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState, Suspense, useRef } from "react";
import { BubblesClient } from "./bubbles-client";

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12 md:pt-16">
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
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#222538]/60 via-[#222538]/40 to-[#222538]/70" />

        {/* Bubbles - Client-side only component to avoid hydration mismatch */}
        <Suspense fallback={null}>
          <BubblesClient />
        </Suspense>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 mt-8 md:mt-12">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 text-white font-[family-name:var(--font-space-grotesk)] tracking-tight leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block bg-clip-text bg-gradient-to-r from-white to-white/80">
              Fueling Traders{" "}
              <motion.span
                className="text-[#8FD9E2] inline-block"
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
              Funding Dreams
            </span>
          </motion.h1>
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed mt-4">
            Join over 1,000,000 traders in the world's leading proprietary trading firm.
            Trade in a fully simulated environment with your favorite platforms and earn
            up to 90% profit splits with zero reward denials.
          </p>
          <div className="flex justify-center">
            <Button
              className="bg-gradient-to-r from-[#5A7682] to-[#222538] text-white text-lg px-10 py-7 rounded-lg hover:from-[#4a6270] hover:to-[#191b2c] transition-all duration-300 shadow-lg hover:shadow-xl font-[family-name:var(--font-space-grotesk)] font-bold tracking-wide"
            >
              BUY CHALLENGE
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
