"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import "@/app/market-overview.css";
import { LineChart, BarChart3, TrendingUp } from "lucide-react";

export function MarketOverview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

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
    widgetContainer.style.margin = "0";
    widgetContainer.style.padding = "0";
    widgetContainer.style.overflow = "hidden";

    // Create the widget div
    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    widget.style.height = "100%";
    widget.style.width = "100%";
    widget.style.margin = "0";
    widget.style.padding = "0";
    widget.style.overflow = "hidden";
    widgetContainer.appendChild(widget);

    // Create the copyright div
    const copyright = document.createElement("div");
    copyright.className = "tradingview-widget-copyright";
    copyright.innerHTML = '<a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a>';
    copyright.style.display = "none"; // Hide the copyright element
    widgetContainer.appendChild(copyright);

    // Add the container to the DOM
    if (containerRef.current) {
      containerRef.current.appendChild(widgetContainer);
    }

    // Create and load the script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({
      colorTheme: "dark",
      dateRange: "12M",
      showChart: true,
      locale: "en",
      largeChartUrl: "",
      isTransparent: false,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      width: "100%",
      height: "100%",
      noTimeScale: false,
      chartOnly: false,
      container_id: "tradingview-widget",
      plotLineColorGrowing: "rgba(41, 98, 255, 1)",
      plotLineColorFalling: "rgba(41, 98, 255, 1)",
      gridLineColor: "rgba(242, 242, 242, 0)",
      scaleFontColor: "rgba(219, 219, 219, 1)",
      belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
      belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
      symbolActiveColor: "rgba(41, 98, 255, 0.12)",
      tabs: [
        {
          title: "Indices",
          symbols: [
            {
              s: "FOREXCOM:SPXUSD",
              d: "S&P 500 Index"
            },
            {
              s: "FOREXCOM:NSXUSD",
              d: "US 100 Cash CFD"
            },
            {
              s: "FOREXCOM:DJI",
              d: "Dow Jones Industrial Average Index"
            },
            {
              s: "INDEX:NKY",
              d: "Japan 225"
            },
            {
              s: "INDEX:DEU40",
              d: "DAX Index"
            },
            {
              s: "FOREXCOM:UKXGBP",
              d: "FTSE 100 Index"
            }
          ],
          originalTitle: "Indices"
        },
        {
          title: "Forex",
          symbols: [
            {
              s: "FX:EURUSD",
              d: "EUR to USD"
            },
            {
              s: "FX:GBPUSD",
              d: "GBP to USD"
            },
            {
              s: "FX:USDJPY",
              d: "USD to JPY"
            },
            {
              s: "FX:USDCHF",
              d: "USD to CHF"
            },
            {
              s: "FX:AUDUSD",
              d: "AUD to USD"
            },
            {
              s: "FX:USDCAD",
              d: "USD to CAD"
            }
          ],
          originalTitle: "Forex"
        },
        {
          title: "Futures",
          symbols: [
            {
              s: "BMFBOVESPA:ISP1!",
              d: "S&P 500 Index Futures"
            },
            {
              s: "BMFBOVESPA:EUR1!",
              d: "Euro Futures"
            },
            {
              s: "PYTH:WTI3!",
              d: "WTI CRUDE OIL"
            },
            {
              s: "BMFBOVESPA:ETH1!",
              d: "Hydrous ethanol"
            },
            {
              s: "BMFBOVESPA:CCM1!",
              d: "Corn"
            }
          ],
          originalTitle: "Futures"
        },
        {
          title: "Bonds",
          symbols: [
            {
              s: "EUREX:FGBL1!",
              d: "Euro Bund"
            },
            {
              s: "EUREX:FBTP1!",
              d: "Euro BTP"
            },
            {
              s: "EUREX:FGBM1!",
              d: "Euro BOBL"
            }
          ],
          originalTitle: "Bonds"
        }
      ]
    });
    widgetContainer.appendChild(script);

    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  useEffect(() => {
    // Clear any existing content
    if (tickerRef.current) {
      tickerRef.current.innerHTML = "";
    }

    // Create the widget container
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container";
    widgetContainer.style.width = "100%";
    widgetContainer.style.margin = "0";
    widgetContainer.style.padding = "0";
    widgetContainer.style.overflow = "hidden";

    // Create the widget div
    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    widget.style.width = "100%";
    widget.style.margin = "0";
    widget.style.padding = "0";
    widget.style.overflow = "hidden";
    widgetContainer.appendChild(widget);

    // Create the copyright div
    const copyright = document.createElement("div");
    copyright.className = "tradingview-widget-copyright";
    copyright.innerHTML = '<a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a>';
    copyright.style.display = "none"; // Hide the copyright element
    widgetContainer.appendChild(copyright);

    // Add the container to the DOM
    if (tickerRef.current) {
      tickerRef.current.appendChild(widgetContainer);
    }

    // Create and load the script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: "FOREXCOM:SPXUSD",
          title: "S&P 500 Index"
        },
        {
          proName: "FOREXCOM:NSXUSD",
          title: "US 100 Cash CFD"
        },
        {
          proName: "FX_IDC:EURUSD",
          title: "EUR to USD"
        },
        {
          proName: "BITSTAMP:BTCUSD",
          title: "Bitcoin"
        },
        {
          proName: "BITSTAMP:ETHUSD",
          title: "Ethereum"
        }
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "regular",
      colorTheme: "dark",
      locale: "en"
    });
    widgetContainer.appendChild(script);

    // Cleanup function
    return () => {
      if (tickerRef.current) {
        tickerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <section className="pt-20 relative overflow-hidden">
      {/* Simple background */}
      <div className="absolute inset-0 bg-gray-900/5 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >


            <h2 className="text-3xl md:text-5xl font-bold mb-4 relative text-blue-400">
              Market Overview
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest market conditions across different asset classes.
            </p>
          </motion.div>
        </div>

        {/* Flex container for chart and content - responsive layout */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Chart section - flex-1 */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="glass-card-modern-v3 border border-gray-700/20 shadow-lg relative overflow-hidden">
              <div id="tradingview-widget" ref={containerRef} className="w-full h-[550px] overflow-hidden"></div>
            </div>
          </motion.div>

          {/* Text content section - flex-1 */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="glass-card-modern-v3 h-full p-8 flex flex-col justify-center border border-gray-700/20 shadow-lg relative overflow-hidden">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-blue-400">Market Insights</h3>
              </div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-xl bg-gray-800/10 border border-gray-700/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-full bg-gray-800/30">
                      <LineChart className="h-5 w-5 text-gray-900" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-blue-400">
                        Real-Time Analysis
                      </h4>
                      <p className="text-muted-foreground">
                        Access professional-grade charts with advanced technical indicators to make informed trading decisions.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-xl bg-gray-800/10 border border-gray-700/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-full bg-gray-800/30">
                      <BarChart3 className="h-5 w-5 text-gray-900" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-blue-400">
                        Multi-Asset Coverage
                      </h4>
                      <p className="text-muted-foreground">
                        Track forex pairs, cryptocurrencies, indices, and stocks all in one place with our comprehensive market overview.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-xl bg-gray-800/10 border border-gray-700/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-full bg-gray-800/30">
                      <TrendingUp className="h-5 w-5 text-gray-900" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-blue-400">
                        Trading Opportunities
                      </h4>
                      <p className="text-muted-foreground">
                        Identify potential trading setups across multiple timeframes and asset classes to diversify your strategy.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Ticker widget at the bottom of the section */}
        <div className="mt-8">
          <div ref={tickerRef} className="w-full overflow-hidden"></div>
        </div>
      </div>
    </section>
  );
}
