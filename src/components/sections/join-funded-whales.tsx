"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Instagram,
  Linkedin,
  Facebook
} from "lucide-react";

interface SocialLinkProps {
  icon: React.ReactNode;
  name: string;
  href: string;
  delay?: number;
  className?: string;
}

const SocialLink = ({ icon, name, href, delay = 0, className }: SocialLinkProps) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{
        y: -5,
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      className={cn(
        "relative overflow-hidden rounded-full backdrop-blur-sm border border-border/50 shadow-sm transition-all duration-300",
        className
      )}
    >
      {/* Gradient background that shows on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-accent/80 opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative p-6 flex flex-col items-center justify-center">
        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4"
          whileHover={{
            rotate: [0, 10, -10, 0],
            scale: 1.1,
            boxShadow: "0 0 15px rgba(14, 165, 233, 0.5)",
            transition: { duration: 0.5 }
          }}
        >
          {icon}
        </motion.div>
        <h3 className="text-lg font-semibold mb-1 gradient-text">{name}</h3>
      </div>
    </motion.a>
  );
};

export function JoinFundedWhales() {
  const socialLinks = [
    {
      icon: <Instagram className="w-8 h-8 text-primary" />,
      name: "Instagram",
      href: "https://instagram.com/fundedwhales",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-primary"
        >
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      ),
      name: "X",
      href: "https://x.com/fundedwhales",
    },
    {
      icon: <Facebook className="w-8 h-8 text-primary" />,
      name: "Facebook",
      href: "https://facebook.com/fundedwhales",
    },
    {
      icon: <Linkedin className="w-8 h-8 text-primary" />,
      name: "LinkedIn",
      href: "https://linkedin.com/company/fundedwhales",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 127.14 96.36"
          fill="currentColor"
          className="w-8 h-8 text-primary"
        >
          <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
        </svg>
      ),
      name: "Discord",
      href: "https://discord.gg/fundedwhales",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Join Funded Whales</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with professional traders, access exclusive market insights, and elevate your trading journey with our vibrant community
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {socialLinks.map((link, index) => (
            <SocialLink
              key={link.name}
              icon={link.icon}
              name={link.name}
              href={link.href}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
