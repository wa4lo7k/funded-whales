"use client";

import { NewFooter } from "@/components/layout/new-footer";

export default function DesignDemo() {
  return (
    <div className="design-upgrade design-upgrade-bg dark-gradient">
      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Design Upgrade Demo</h1>
        </div>

        <div className="design-upgrade-section mb-10 p-8">
          <h2 className="text-3xl font-bold mb-6">Section Example</h2>
          <p className="text-lg mb-6">
            This section demonstrates the styling with the new design upgrades.
            Notice the Poppins font, gradient text headings, and the section styling.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white/10 p-6 rounded-lg hover-scale"
                data-aos="fade-up"
                data-aos-delay={item * 100}
              >
                <h3 className="gradient-heading text-xl font-bold mb-4">Feature {item}</h3>
                <p>
                  This card demonstrates the hover scale effect and the fade-up animation.
                  It also shows the glass-like background styling.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer is already included in the layout */}
    </div>
  );
}
