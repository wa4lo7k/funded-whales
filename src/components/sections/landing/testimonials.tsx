"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Forex Trader",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5,
    text: "Funded Whales has completely transformed my trading career. The challenge was fair and the funding process was smooth. I'm now trading a $25,000 account with an 85% profit share!",
  },
  {
    name: "Michael Chen",
    role: "Indices Trader",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5,
    text: "I've tried several prop firms, but Funded Whales stands out with their transparent rules and excellent support. The platform is intuitive and the payouts are always on time.",
  },
  {
    name: "Emma Rodriguez",
    role: "Commodities Trader",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4,
    text: "The challenge was challenging but fair. What I appreciate most is the responsive support team who are always ready to help with any questions. Highly recommended!",
  },
  {
    name: "David Kim",
    role: "Crypto Trader",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 5,
    text: "As a crypto trader, I was thrilled to find Funded Whales offering crypto trading challenges. The platform is stable, and the scaling opportunities are excellent.",
  },
  {
    name: "Olivia Thompson",
    role: "Swing Trader",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
    rating: 5,
    text: "Being able to hold positions over the weekend is a game-changer for my swing trading strategy. Funded Dolphin understands what traders need to succeed.",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-[#5A7682]/10 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-[#8FD9E2]">Trader Testimonials</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from our successful traders who have passed the challenge
              and are now trading with our funded accounts.
            </p>
          </motion.div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <div className="glass-card h-full p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "text-[#8FD9E2] fill-[#8FD9E2]"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{testimonial.text}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="static transform-none mr-2" />
            <CarouselNext className="static transform-none ml-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
