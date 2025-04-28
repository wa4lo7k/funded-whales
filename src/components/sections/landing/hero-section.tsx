"use client";

import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Bubbles } from "./bubbles";

export function HeroSection() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: [0, -15, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    });
  }, [controls]);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Animated background with waves */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--primary-light)] to-transparent opacity-10"></div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="var(--primary)"
              fillOpacity="0.1"
              d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,165.3C672,192,768,224,864,213.3C960,203,1056,149,1152,133.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="var(--accent)"
              fillOpacity="0.1"
              d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,181.3C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </motion.div>
      </div>

      {/* Animated whale */}
      <motion.div
        className="absolute right-10 bottom-20 z-10 hidden lg:block"
        animate={controls}
      >
        <svg
          width="180"
          height="120"
          viewBox="0 0 180 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M150,40 C170,40 180,60 180,80 C180,100 170,120 150,120 L60,120 C30,120 0,90 0,60 C0,30 30,0 60,0 C90,0 120,30 120,60 L150,40 Z"
            fill="var(--primary)"
            fillOpacity="0.3"
            animate={{
              d: [
                "M150,40 C170,40 180,60 180,80 C180,100 170,120 150,120 L60,120 C30,120 0,90 0,60 C0,30 30,0 60,0 C90,0 120,30 120,60 L150,40 Z",
                "M150,45 C170,45 180,65 180,85 C180,105 170,125 150,125 L60,125 C30,125 0,95 0,65 C0,35 30,5 60,5 C90,5 120,35 120,65 L150,45 Z",
                "M150,40 C170,40 180,60 180,80 C180,100 170,120 150,120 L60,120 C30,120 0,90 0,60 C0,30 30,0 60,0 C90,0 120,30 120,60 L150,40 Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <circle cx="40" cy="40" r="5" fill="white" />
          <motion.path
            d="M160,80 C165,80 170,85 170,90 C170,95 165,100 160,100 C155,100 150,95 150,90 C150,85 155,80 160,80 Z"
            fill="var(--primary)"
            fillOpacity="0.5"
            animate={{
              y: [0, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>

      {/* Small bubbles */}
      <Bubbles />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Funded Whales</span>
              <br />
              Trading Challenges
            </h1>
            <p className="text-xl mb-8 text-muted-foreground max-w-2xl">
              Take your trading to the next level with our funded accounts.
              Prove your skills and get access to professional capital with
              up to 90% profit share.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-gradient-to-r from-primary to-accent text-white text-lg px-8 py-6 hover:from-primary-dark hover:to-accent-dark">
                Start Trading Now
              </Button>
              <Button variant="outline" className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
