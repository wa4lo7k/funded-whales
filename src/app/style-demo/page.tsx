"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { initScrollAnimations } from "@/lib/scroll-animations";
import { ArrowRight, Check, ChevronRight, Star } from "lucide-react";
import Link from "next/link";

export default function StyleDemo() {
  // Initialize scroll animations when component mounts
  useEffect(() => {
    const cleanup = initScrollAnimations();
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen">
      <Tabs defaultValue="style1" className="w-full">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Modern Style Variations</h1>
          <p className="text-center mb-8 max-w-2xl mx-auto">
            Choose between different style variations to see how they would look on your website.
            Each style has unique typography, colors, animations, and effects.
          </p>
          
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
            <TabsTrigger value="style1">Style 1</TabsTrigger>
            <TabsTrigger value="style2">Style 2</TabsTrigger>
            <TabsTrigger value="style3">Style 3</TabsTrigger>
          </TabsList>

          {/* Style 1 */}
          <TabsContent value="style1" className="mt-6">
            <div className="font-inter modern-typography">
              {/* Hero Section */}
              <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1] to-[#3b82f6] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10">
                  <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text-purple-blue fade-in-up">
                      Modern Web Experience
                    </h1>
                    <p className="text-xl mb-8 fade-in-up">
                      Elevate your online presence with our sleek, modern design system
                      featuring smooth animations and beautiful gradients.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 fade-in-up">
                      <Button className="modern-button modern-button-gradient">
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="modern-button">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Features Section */}
              <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold mb-4 gradient-text-purple-blue fade-in-up">
                      Key Features
                    </h2>
                    <p className="text-lg fade-in-up">
                      Our modern design system comes with everything you need to create
                      stunning web experiences.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {[
                      {
                        title: "Modern Typography",
                        description: "Clean, readable fonts with perfect hierarchy and spacing",
                        icon: <span className="text-2xl">Aa</span>,
                      },
                      {
                        title: "Gradient Effects",
                        description: "Beautiful gradient text and backgrounds for visual appeal",
                        icon: <span className="text-2xl">🎨</span>,
                      },
                      {
                        title: "Smooth Animations",
                        description: "Subtle, performant animations that enhance user experience",
                        icon: <span className="text-2xl">✨</span>,
                      },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="modern-card p-6 fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="mb-4 text-primary">{feature.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p>{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Glass Card Demo */}
              <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1] to-[#3b82f6] opacity-5"></div>
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto">
                    <div className="glass-card-modern p-8 fade-in-up">
                      <h3 className="text-2xl font-bold mb-4 gradient-text-purple-blue">
                        Glass Card Effect
                      </h3>
                      <p className="mb-6">
                        This modern glassmorphism effect adds depth and elegance to your UI.
                        The subtle blur and transparency create a sophisticated look while
                        maintaining readability and focus.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white/10 p-4 rounded-xl">
                          <h4 className="font-semibold mb-2">Subtle Transparency</h4>
                          <p className="text-sm">
                            The perfect balance of transparency and blur creates depth
                          </p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl">
                          <h4 className="font-semibold mb-2">Elegant Borders</h4>
                          <p className="text-sm">
                            Light borders enhance the glass effect and define boundaries
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Button Showcase */}
              <section className="py-16">
                <div className="container mx-auto px-4">
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold mb-4 gradient-text-purple-blue fade-in-up">
                      Button Styles
                    </h2>
                    <p className="fade-in-up">
                      Modern, interactive buttons with hover effects and smooth transitions.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4 fade-in-up">
                    <Button className="modern-button modern-button-gradient">
                      Primary Button
                    </Button>
                    <Button variant="outline" className="modern-button">
                      Secondary Button
                    </Button>
                    <Button variant="ghost" className="modern-button">
                      Ghost Button
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          </TabsContent>

          {/* Style 2 */}
          <TabsContent value="style2" className="mt-6">
            <div className="font-sora-v2 modern-typography-v2">
              {/* Hero Section */}
              <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10">
                  <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text-violet-pink fade-in-up-v2">
                      Bold & Vibrant Design
                    </h1>
                    <p className="text-xl mb-8 fade-in-up-v2">
                      Make a statement with our bold design system featuring vibrant gradients
                      and eye-catching animations.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 fade-in-up-v2">
                      <Button className="modern-button-v2 modern-button-gradient-v2">
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="modern-button-v2">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Features Section */}
              <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold mb-4 gradient-text-violet-pink fade-in-up-v2">
                      Standout Features
                    </h2>
                    <p className="text-lg fade-in-up-v2">
                      Our vibrant design system helps your brand stand out with bold colors
                      and dynamic elements.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {[
                      {
                        title: "Bold Typography",
                        description: "Strong, impactful fonts that command attention",
                        icon: <span className="text-2xl">Aa</span>,
                      },
                      {
                        title: "Vibrant Gradients",
                        description: "Eye-catching color combinations that pop",
                        icon: <span className="text-2xl">🎨</span>,
                      },
                      {
                        title: "Dynamic Animations",
                        description: "Engaging motion that brings your interface to life",
                        icon: <span className="text-2xl">✨</span>,
                      },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="modern-card-v2 p-6 animate-scale-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="mb-4 text-primary">{feature.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p>{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Glass Card Demo */}
              <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] opacity-5"></div>
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto">
                    <div className="glass-card-modern-v2 p-8 fade-in-up-v2">
                      <h3 className="text-2xl font-bold mb-4 gradient-text-violet-pink">
                        Enhanced Glass Effect
                      </h3>
                      <p className="mb-6">
                        Our enhanced glassmorphism creates a premium look with deeper blur
                        and more pronounced transparency. Perfect for creating depth in your UI.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white/10 p-4 rounded-xl">
                          <h4 className="font-semibold mb-2">Deep Blur Effect</h4>
                          <p className="text-sm">
                            Increased blur radius creates a more pronounced glass effect
                          </p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl">
                          <h4 className="font-semibold mb-2">Dynamic Borders</h4>
                          <p className="text-sm">
                            Borders that respond to interaction enhance the premium feel
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Button Showcase */}
              <section className="py-16">
                <div className="container mx-auto px-4">
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold mb-4 gradient-text-violet-pink fade-in-up-v2">
                      Interactive Buttons
                    </h2>
                    <p className="fade-in-up-v2">
                      Buttons with enhanced hover effects and dynamic transitions.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4 fade-in-up-v2">
                    <Button className="modern-button-v2 modern-button-gradient-v2">
                      Primary Action
                    </Button>
                    <Button variant="outline" className="modern-button-v2">
                      Secondary Action
                    </Button>
                    <Button variant="ghost" className="modern-button-v2">
                      Tertiary Action
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          </TabsContent>

          {/* Style 3 */}
          <TabsContent value="style3" className="mt-6">
            <div className="font-poppins-v3 modern-typography-v3">
              {/* Hero Section */}
              <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] to-[#0891b2] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10">
                  <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text-deep-blue-aqua animate-fade-in-up-v3">
                      Sophisticated & Elegant
                    </h1>
                    <p className="text-xl mb-8 animate-fade-in-up-v3 animate-delay-100">
                      Elevate your digital presence with our sophisticated design system
                      featuring elegant animations and refined aesthetics.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up-v3 animate-delay-200">
                      <Button className="modern-button-v3 modern-button-gradient-v3">
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="modern-button-v3">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Features Section */}
              <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold mb-4 gradient-text-deep-blue-aqua animate-fade-in-up-v3">
                      Premium Features
                    </h2>
                    <p className="text-lg animate-fade-in-up-v3 animate-delay-100">
                      Our sophisticated design system delivers a premium experience with
                      refined aesthetics and subtle interactions.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {[
                      {
                        title: "Elegant Typography",
                        description: "Refined, sophisticated fonts with perfect balance",
                        icon: <span className="text-2xl">Aa</span>,
                      },
                      {
                        title: "Subtle Gradients",
                        description: "Tasteful color transitions that convey professionalism",
                        icon: <span className="text-2xl">🎨</span>,
                      },
                      {
                        title: "Refined Animations",
                        description: "Elegant motion that enhances without distracting",
                        icon: <span className="text-2xl">✨</span>,
                      },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="modern-card-v3 p-6 animate-fade-in-up-v3"
                        style={{ animationDelay: `${(index + 2) * 100}ms` }}
                      >
                        <div className="mb-4 text-primary">{feature.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p>{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Glass Card Demo */}
              <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] to-[#0891b2] opacity-5"></div>
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto">
                    <div className="glass-card-modern-v3 p-8 animate-fade-in-up-v3">
                      <h3 className="text-2xl font-bold mb-4 gradient-text-deep-blue-aqua">
                        Premium Glass Effect
                      </h3>
                      <p className="mb-6">
                        Our premium glassmorphism effect creates a sophisticated, high-end look
                        with carefully balanced transparency and refined borders.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white/10 p-4 rounded-xl">
                          <h4 className="font-semibold mb-2">Refined Transparency</h4>
                          <p className="text-sm">
                            Carefully calibrated opacity creates a premium glass appearance
                          </p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl">
                          <h4 className="font-semibold mb-2">Sophisticated Shadows</h4>
                          <p className="text-sm">
                            Subtle, layered shadows add depth and dimension
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Button Showcase */}
              <section className="py-16">
                <div className="container mx-auto px-4">
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold mb-4 gradient-text-deep-blue-aqua animate-fade-in-up-v3">
                      Sophisticated Buttons
                    </h2>
                    <p className="animate-fade-in-up-v3 animate-delay-100">
                      Elegant buttons with refined hover effects and smooth transitions.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up-v3 animate-delay-200">
                    <Button className="modern-button-v3 modern-button-gradient-v3">
                      Primary Action
                    </Button>
                    <Button variant="outline" className="modern-button-v3">
                      Secondary Action
                    </Button>
                    <Button variant="ghost" className="modern-button-v3">
                      Tertiary Action
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Back to home link */}
      <div className="container mx-auto px-4 py-8 text-center">
        <Link href="/" className="text-primary hover:underline inline-flex items-center">
          <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
