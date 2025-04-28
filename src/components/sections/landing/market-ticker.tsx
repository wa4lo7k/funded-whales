"use client";

import { useEffect, useRef } from "react";

export function MarketTicker() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clear any existing content
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    // Create the widget container
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container";

    // Create the widget div
    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    widgetContainer.appendChild(widget);

    // Add the container to the DOM
    if (containerRef.current) {
      containerRef.current.appendChild(widgetContainer);
    }

    // Create and load the script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
        { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
        { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" }
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "adaptive",
      colorTheme: "dark",
      locale: "en",
      copyrightStyles: {
        parent: { display: "none" }
      }
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
    <div className="w-full py-3 bg-[var(--glass-background)] backdrop-blur-md border-y border-[var(--glass-border)] overflow-hidden">
      <div ref={containerRef} className="tradingview-widget-container"></div>
    </div>
  );
}
