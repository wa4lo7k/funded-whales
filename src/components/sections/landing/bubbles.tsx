"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Define a fixed set of bubble configurations to avoid hydration mismatches
const bubbleConfigs = [
  { width: 23.3, height: 12.5, left: "71.1%", bottom: "-11.8px" },
  { width: 25.0, height: 21.3, left: "96.3%", bottom: "-19.4px" },
  { width: 17.6, height: 21.4, left: "38.3%", bottom: "-12.7px" },
  { width: 13.6, height: 25.3, left: "18.2%", bottom: "-3.4px" },
  { width: 21.7, height: 24.0, left: "78.2%", bottom: "-12.7px" },
  { width: 16.9, height: 11.1, left: "39.2%", bottom: "-11.4px" },
  { width: 12.5, height: 20.6, left: "51.1%", bottom: "-3.5px" },
  { width: 27.0, height: 28.9, left: "87.2%", bottom: "-7.6px" },
  { width: 20.1, height: 17.9, left: "13.8%", bottom: "-12.0px" },
  { width: 25.3, height: 20.1, left: "24.4%", bottom: "-8.4px" },
];

export function Bubbles() {
  const [isMounted, setIsMounted] = useState(false);

  // Only render bubbles on the client side after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Return nothing during SSR
  }

  return (
    <>
      {bubbleConfigs.map((config, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/10 z-0"
          style={{
            width: config.width,
            height: config.height,
            left: config.left,
            bottom: config.bottom,
          }}
          animate={{
            y: [0, -100 - (i * 40)],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 10 + (i * 1.5),
            repeat: Infinity,
            delay: i * 2,
          }}
        />
      ))}
    </>
  );
}
