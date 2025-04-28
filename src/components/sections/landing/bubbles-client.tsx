"use client";

import { motion } from "framer-motion";

// Define bubble positions and sizes outside the component to ensure consistency
const bubbleConfigs = [
  { width: 12, height: 12, left: "7%", bottom: "-1.5%", duration: 16.5, delay: 0 },
  { width: 14, height: 14, left: "14%", bottom: "-3%", duration: 18, delay: 3 },
  { width: 16, height: 16, left: "21%", bottom: "-4.5%", duration: 19.5, delay: 6 },
  { width: 18, height: 18, left: "28%", bottom: "-6%", duration: 21, delay: 9 },
  { width: 20, height: 20, left: "35%", bottom: "-7.5%", duration: 22.5, delay: 12 },
  { width: 22, height: 22, left: "42%", bottom: "-9%", duration: 24, delay: 15 },
  { width: 24, height: 24, left: "49%", bottom: "-10.5%", duration: 25.5, delay: 18 },
  { width: 26, height: 26, left: "56%", bottom: "-12%", duration: 27, delay: 21 },
  { width: 28, height: 28, left: "63%", bottom: "-13.5%", duration: 28.5, delay: 24 },
  { width: 30, height: 30, left: "70%", bottom: "-15%", duration: 30, delay: 27 },
  { width: 32, height: 32, left: "77%", bottom: "-16.5%", duration: 31.5, delay: 30 },
  { width: 34, height: 34, left: "84%", bottom: "-18%", duration: 33, delay: 33 },
  { width: 36, height: 36, left: "91%", bottom: "-19.5%", duration: 34.5, delay: 36 },
  { width: 38, height: 38, left: "98%", bottom: "-1%", duration: 36, delay: 39 },
  { width: 40, height: 40, left: "5%", bottom: "-2.5%", duration: 37.5, delay: 42 },
];

export function BubblesClient() {
  return (
    <>
      {bubbleConfigs.map((config, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: config.width,
            height: config.height,
            left: config.left,
            bottom: config.bottom,
          }}
          animate={{
            y: [0, -1000],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: config.duration,
            repeat: Infinity,
            delay: config.delay,
          }}
        />
      ))}
    </>
  );
}
