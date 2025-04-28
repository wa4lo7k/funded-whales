"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const instruments = [
  {
    category: "Forex",
    description: "Trade major, minor, and exotic currency pairs",
    leverage: "1:100",
    spread: "From 0.1 pips",
    commission: "None",
    minLot: "0.01",
    tradingHours: "24/5",
    platforms: ["MT4", "MT5", "cTrader"],
  },
  {
    category: "Indices",
    description: "Trade major global stock indices",
    leverage: "1:50",
    spread: "From 0.4 points",
    commission: "None",
    minLot: "0.01",
    tradingHours: "Varies by index",
    platforms: ["MT4", "MT5", "cTrader"],
  },
  {
    category: "Commodities",
    description: "Trade gold, silver, oil, and more",
    leverage: "1:50",
    spread: "From 0.3 points",
    commission: "None",
    minLot: "0.01",
    tradingHours: "Varies by commodity",
    platforms: ["MT4", "MT5"],
  },
  {
    category: "Cryptocurrencies",
    description: "Trade Bitcoin, Ethereum, and other cryptocurrencies",
    leverage: "1:10",
    spread: "From 0.5%",
    commission: "0.1%",
    minLot: "0.01",
    tradingHours: "24/7",
    platforms: ["MT5", "cTrader"],
  },
  {
    category: "Stocks",
    description: "Trade shares of major global companies",
    leverage: "1:5",
    spread: "From 0.1%",
    commission: "0.1%",
    minLot: "1 share",
    tradingHours: "Exchange hours",
    platforms: ["MT5"],
  },
];

export function TradingInstruments() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Trading Instruments</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Compare the different trading instruments available on our platform.
            </p>
          </motion.div>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-4 px-4 font-semibold">Instrument</th>
                  <th className="text-left py-4 px-4 font-semibold">Description</th>
                  <th className="text-center py-4 px-4 font-semibold">Leverage</th>
                  <th className="text-center py-4 px-4 font-semibold">Spread</th>
                  <th className="text-center py-4 px-4 font-semibold">Commission</th>
                  <th className="text-center py-4 px-4 font-semibold">Min Lot</th>
                  <th className="text-center py-4 px-4 font-semibold">Trading Hours</th>
                  <th className="text-center py-4 px-4 font-semibold">Platforms</th>
                </tr>
              </thead>
              <tbody>
                {instruments.map((instrument, index) => (
                  <motion.tr
                    key={instrument.category}
                    className="border-b border-[var(--border)]"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <td className="py-4 px-4">
                      <div className="font-semibold text-lg">{instrument.category}</div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {instrument.description}
                    </td>
                    <td className="text-center py-4 px-4">{instrument.leverage}</td>
                    <td className="text-center py-4 px-4">{instrument.spread}</td>
                    <td className="text-center py-4 px-4">{instrument.commission}</td>
                    <td className="text-center py-4 px-4">{instrument.minLot}</td>
                    <td className="text-center py-4 px-4">{instrument.tradingHours}</td>
                    <td className="text-center py-4 px-4">
                      <div className="flex flex-wrap justify-center gap-1">
                        {instrument.platforms.map((platform) => (
                          <span
                            key={platform}
                            className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12">
          <div className="glass-card">
            <h3 className="text-xl font-semibold mb-6">Platform Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Feature</th>
                    <th className="text-center py-3 px-4">MT4</th>
                    <th className="text-center py-3 px-4">MT5</th>
                    <th className="text-center py-3 px-4">cTrader</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">Forex</td>
                    <td className="text-center py-3 px-4">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">Indices</td>
                    <td className="text-center py-3 px-4">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">Commodities</td>
                    <td className="text-center py-3 px-4">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <X className="inline-block w-5 h-5 text-red-500" />
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">Cryptocurrencies</td>
                    <td className="text-center py-3 px-4">
                      <X className="inline-block w-5 h-5 text-red-500" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">Stocks</td>
                    <td className="text-center py-3 px-4">
                      <X className="inline-block w-5 h-5 text-red-500" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <X className="inline-block w-5 h-5 text-red-500" />
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">Advanced Charting</td>
                    <td className="text-center py-3 px-4">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">Economic Calendar</td>
                    <td className="text-center py-3 px-4">
                      <X className="inline-block w-5 h-5 text-red-500" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">Mobile App</td>
                    <td className="text-center py-3 px-4">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
