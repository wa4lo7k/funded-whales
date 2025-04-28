"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Calendar, Clock, Flag } from "lucide-react";

// Mock economic calendar data
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
};

const economicEvents = {
  today: [
    {
      time: "08:30",
      country: "USD",
      event: "Initial Jobless Claims",
      impact: "medium",
      forecast: "235K",
      previous: "242K",
    },
    {
      time: "10:00",
      country: "USD",
      event: "Existing Home Sales",
      impact: "medium",
      forecast: "4.20M",
      previous: "4.38M",
    },
    {
      time: "10:30",
      country: "USD",
      event: "Natural Gas Storage",
      impact: "low",
      forecast: "87B",
      previous: "76B",
    },
    {
      time: "11:30",
      country: "USD",
      event: "7-Year Note Auction",
      impact: "low",
      forecast: "",
      previous: "4.59%",
    },
    {
      time: "18:00",
      country: "EUR",
      event: "EU Leaders Summit",
      impact: "medium",
      forecast: "",
      previous: "",
    },
  ],
  tomorrow: [
    {
      time: "02:00",
      country: "GBP",
      event: "Retail Sales m/m",
      impact: "high",
      forecast: "0.3%",
      previous: "-0.3%",
    },
    {
      time: "08:30",
      country: "USD",
      event: "Core Durable Goods Orders m/m",
      impact: "high",
      forecast: "0.2%",
      previous: "-0.2%",
    },
    {
      time: "09:45",
      country: "USD",
      event: "Flash Manufacturing PMI",
      impact: "medium",
      forecast: "51.0",
      previous: "50.3",
    },
    {
      time: "09:45",
      country: "USD",
      event: "Flash Services PMI",
      impact: "medium",
      forecast: "52.0",
      previous: "51.7",
    },
  ],
  dayAfter: [
    {
      time: "All Day",
      country: "JPY",
      event: "Bank Holiday",
      impact: "low",
      forecast: "",
      previous: "",
    },
    {
      time: "04:00",
      country: "EUR",
      event: "German Ifo Business Climate",
      impact: "medium",
      forecast: "86.0",
      previous: "85.5",
    },
    {
      time: "08:30",
      country: "CAD",
      event: "Core Retail Sales m/m",
      impact: "medium",
      forecast: "0.2%",
      previous: "-0.3%",
    },
    {
      time: "10:00",
      country: "USD",
      event: "CB Consumer Confidence",
      impact: "high",
      forecast: "104.0",
      previous: "102.5",
    },
  ],
};

const getImpactColor = (impact: string) => {
  switch (impact) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

const getCountryFlag = (country: string) => {
  switch (country) {
    case "USD":
      return "🇺🇸";
    case "EUR":
      return "🇪🇺";
    case "GBP":
      return "🇬🇧";
    case "JPY":
      return "🇯🇵";
    case "CAD":
      return "🇨🇦";
    default:
      return "🏳️";
  }
};

export function EconomicCalendar() {
  return (
    <section className="py-20 bg-[var(--glass-background)] backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Economic Calendar</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay informed about upcoming economic events that could impact the markets.
            </p>
          </motion.div>
        </div>

        <div className="glass-card">
          <Tabs defaultValue="today" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="today">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(today)}
              </TabsTrigger>
              <TabsTrigger value="tomorrow">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(tomorrow)}
              </TabsTrigger>
              <TabsTrigger value="dayAfter">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(dayAfterTomorrow)}
              </TabsTrigger>
            </TabsList>
            
            {Object.entries(economicEvents).map(([day, events]) => (
              <TabsContent key={day} value={day} className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[var(--border)]">
                        <th className="text-left py-3 px-4">Time</th>
                        <th className="text-left py-3 px-4">Country</th>
                        <th className="text-left py-3 px-4">Event</th>
                        <th className="text-center py-3 px-4">Impact</th>
                        <th className="text-right py-3 px-4">Forecast</th>
                        <th className="text-right py-3 px-4">Previous</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event, index) => (
                        <tr key={index} className="border-b border-[var(--border)]">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                              {event.time}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <span className="text-xl mr-2" aria-hidden="true">
                                {getCountryFlag(event.country)}
                              </span>
                              {event.country}
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium">{event.event}</td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center">
                              <span
                                className={`inline-block w-3 h-3 rounded-full ${getImpactColor(
                                  event.impact
                                )}`}
                                title={`${event.impact.charAt(0).toUpperCase() + event.impact.slice(1)} Impact`}
                              ></span>
                            </div>
                          </td>
                          <td className="text-right py-3 px-4">{event.forecast || "-"}</td>
                          <td className="text-right py-3 px-4">{event.previous || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-end gap-4 text-sm text-muted-foreground pt-2">
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                    High Impact
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                    Medium Impact
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                    Low Impact
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
