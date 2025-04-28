"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export function MarketOverview() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clear any existing content
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    // Create the widget container
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container";
    widgetContainer.style.height = "100%";
    widgetContainer.style.width = "100%";

    // Create the widget div
    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    widget.style.height = "100%";
    widget.style.width = "100%";
    widgetContainer.appendChild(widget);

    // Create an empty copyright div to maintain widget structure
    const copyright = document.createElement("div");
    copyright.className = "tradingview-widget-copyright";
    copyright.style.display = "none"; // Hide the copyright element
    widgetContainer.appendChild(copyright);

    // Add the container to the DOM
    if (containerRef.current) {
      containerRef.current.appendChild(widgetContainer);
    }

    // Create and load the script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "FOREXCOM:EURUSD",
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      hide_top_toolbar: false,
      allow_symbol_change: true,
      watchlist: [
        "FOREXCOM:EURUSD",
        "FOREXCOM:GBPUSD",
        "FOREXCOM:USDJPY",
        "FOREXCOM:AUDUSD",
        "FOREXCOM:USDCAD",
        "BITSTAMP:BTCUSD",
        "BITSTAMP:ETHUSD",
        "NASDAQ:AAPL",
        "NASDAQ:MSFT",
        "NASDAQ:AMZN"
      ],
      studies: [
        "MASimple@tv-basicstudies",
        "RSI@tv-basicstudies"
      ],
      support_host: "https://www.tradingview.com"
    });
    widgetContainer.appendChild(script);

    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

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
              <span className="gradient-text">Market Overview</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest market conditions across different asset classes.
            </p>
          </motion.div>
        </div>

        <div className="glass-card">
          <div ref={containerRef} className="w-full h-[600px]"></div>
        </div>
      </div>
    </section>
  );
}
