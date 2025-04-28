"use client";

import { ExactFooter } from "@/components/layout/exact-footer";

export default function ExactMatchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#1b2735] text-white font-['Poppins']">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Exact Footer Match</h1>
        <p className="text-lg mb-12">
          This page demonstrates the footer that exactly matches the design in the image.
        </p>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-20">
          <h2 className="text-2xl font-bold mb-4 text-[#007BFF]">Key Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Dark blue background (#0f1423)</li>
            <li>Light blue (#007BFF) headings</li>
            <li>Gray text for content</li>
            <li>Proper spacing and layout</li>
            <li>Social media icons with hover effects</li>
            <li>Risk disclosure section with icon</li>
          </ul>
        </div>
      </div>
      
      <ExactFooter />
    </div>
  );
}
