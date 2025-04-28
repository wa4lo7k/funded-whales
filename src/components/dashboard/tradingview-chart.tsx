"use client";

import { useEffect, useRef, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronDown, Maximize2, Minimize2 } from "lucide-react";

interface TradingViewChartProps {
  symbol?: string;
  interval?: string;
  theme?: "light" | "dark";
  autosize?: boolean;
  height?: number;
  fullscreen?: boolean;
}

export function TradingViewChart({
  symbol = "EURUSD",
  interval = "D",
  theme = "dark",
  autosize = true,
  height = 500,
  fullscreen = false,
}: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(fullscreen);
  const [selectedSymbol, setSelectedSymbol] = useState(symbol);
  const [selectedInterval, setSelectedInterval] = useState(interval);
  const [chartType, setChartType] = useState<"advanced" | "simple">("advanced");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = createWidget;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [selectedSymbol, selectedInterval, chartType, isFullscreen]);

  const createWidget = () => {
    if (!containerRef.current) return;
    
    // Clear previous widget if any
    containerRef.current.innerHTML = "";

    if (typeof window.TradingView === "undefined") return;

    if (chartType === "advanced") {
      new window.TradingView.widget({
        container_id: containerRef.current.id,
        autosize,
        height: isFullscreen ? window.innerHeight - 100 : height,
        symbol: selectedSymbol,
        interval: selectedInterval,
        timezone: "Etc/UTC",
        theme,
        style: "1",
        locale: "en",
        toolbar_bg: "rgba(0, 0, 0, 0)",
        enable_publishing: false,
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: true,
        studies: ["RSI@tv-basicstudies", "MAExp@tv-basicstudies", "MACD@tv-basicstudies"],
        show_popup_button: true,
        popup_width: "1000",
        popup_height: "650",
      });
    } else {
      new window.TradingView.MediumWidget({
        container_id: containerRef.current.id,
        symbols: [[selectedSymbol]],
        chartOnly: false,
        width: "100%",
        height: isFullscreen ? window.innerHeight - 100 : height,
        locale: "en",
        colorTheme: theme,
        gridLineColor: "rgba(240, 243, 250, 0.06)",
        fontColor: "#787B86",
        isTransparent: true,
        autosize,
        showVolume: true,
        scalePosition: "right",
        scaleMode: "Normal",
        fontFamily: "Trebuchet MS, sans-serif",
        noTimeScale: false,
        valuesTracking: "1",
        chartType: "area",
        lineColor: "#2962FF",
        bottomColor: "rgba(41, 98, 255, 0.3)",
        topColor: "rgba(41, 98, 255, 0)",
        container: containerRef.current.id,
      });
    }
  };

  const popularSymbols = [
    { name: "EUR/USD", value: "EURUSD" },
    { name: "GBP/USD", value: "GBPUSD" },
    { name: "USD/JPY", value: "USDJPY" },
    { name: "BTC/USD", value: "BTCUSD" },
    { name: "Gold", value: "XAUUSD" },
    { name: "S&P 500", value: "SPX" },
  ];

  const timeIntervals = [
    { name: "1m", value: "1" },
    { name: "5m", value: "5" },
    { name: "15m", value: "15" },
    { name: "1h", value: "60" },
    { name: "4h", value: "240" },
    { name: "1d", value: "D" },
    { name: "1w", value: "W" },
  ];

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <GlassCard className={`overflow-hidden ${isFullscreen ? "fixed inset-0 z-50 m-4 rounded-xl" : ""}`}>
      <div className="p-4 border-b border-border/40">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold">TradingView Chart</h3>
            <p className="text-sm text-muted-foreground">Real-time market analysis</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Tabs value={chartType} onValueChange={(value) => setChartType(value as "advanced" | "simple")} className="mr-2">
              <TabsList className="h-8">
                <TabsTrigger value="advanced" className="text-xs px-2 py-1">Advanced</TabsTrigger>
                <TabsTrigger value="simple" className="text-xs px-2 py-1">Simple</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="relative group">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                {popularSymbols.find(s => s.value === selectedSymbol)?.name || selectedSymbol}
                <ChevronDown className="h-4 w-4" />
              </Button>
              <div className="absolute right-0 mt-1 w-40 bg-background border border-border rounded-md shadow-lg hidden group-hover:block z-10">
                {popularSymbols.map((s) => (
                  <button
                    key={s.value}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-accent"
                    onClick={() => setSelectedSymbol(s.value)}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative group">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                {timeIntervals.find(i => i.value === selectedInterval)?.name || selectedInterval}
                <ChevronDown className="h-4 w-4" />
              </Button>
              <div className="absolute right-0 mt-1 w-24 bg-background border border-border rounded-md shadow-lg hidden group-hover:block z-10">
                {timeIntervals.map((i) => (
                  <button
                    key={i.value}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-accent"
                    onClick={() => setSelectedInterval(i.value)}
                  >
                    {i.name}
                  </button>
                ))}
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
      
      <div 
        id="tradingview_widget_container" 
        ref={containerRef} 
        className="w-full"
        style={{ height: isFullscreen ? 'calc(100vh - 180px)' : `${height}px` }}
      />
    </GlassCard>
  );
}

// Add TradingView types
declare global {
  interface Window {
    TradingView: {
      widget: any;
      MediumWidget: any;
    };
  }
}
