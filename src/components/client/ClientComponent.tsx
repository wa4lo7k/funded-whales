"use client"; // This directive marks this as a Client Component

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setCount((prev) => prev + 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Client Component</CardTitle>
          <CardDescription>Client-side rendering with interactivity</CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            animate={isAnimating ? { scale: 1.2 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
            className="flex justify-center items-center p-4"
          >
            <p className="text-4xl font-bold">{count}</p>
          </motion.div>
          <p className="text-center mb-4">
            This component uses client-side state and animations with Framer Motion
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleClick}>Increment Counter</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
