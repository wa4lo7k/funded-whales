"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import "@/app/market-overview.css";
import { LineChart, BarChart3, TrendingUp } from "lucide-react";

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

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 pointer-events-none"></div>

      {/* Animated background dots */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute w-24 h-24 rounded-full bg-blue-500/30 blur-xl top-1/4 left-1/4 animate-pulse"></div>
        <div className="absolute w-32 h-32 rounded-full bg-cyan-500/30 blur-xl bottom-1/4 right-1/4 animate-pulse-delay-1"></div>
        <div className="absolute w-20 h-20 rounded-full bg-indigo-500/30 blur-xl top-1/3 right-1/3 animate-pulse-delay-2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative elements */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent rounded-full blur-sm"></div>

            <h2 className="text-3xl md:text-5xl font-bold mb-4 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">Market Overview</span>
              <motion.span
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-blue-500/80 to-cyan-400/80 rounded-full"
                initial={{ width: "0%" }}
                whileInView={{ width: "40%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              ></motion.span>
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
            <div className="glass-card h-full border border-blue-500/20 shadow-lg shadow-blue-500/10 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 to-cyan-500/50"></div>
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-xl"></div>

              <div ref={containerRef} className="w-full h-[550px]"></div>
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
            <div className="glass-card h-full p-8 flex flex-col justify-center border border-cyan-500/20 shadow-lg shadow-cyan-500/10 relative overflow-hidden">
              {/* Decorative gradient corner */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl"></div>

              {/* Decorative dots */}
              <div className="absolute bottom-4 left-4 w-24 h-24 opacity-20">
                <div className="absolute w-2 h-2 rounded-full bg-blue-500 top-0 left-0"></div>
                <div className="absolute w-2 h-2 rounded-full bg-blue-500 top-0 left-4"></div>
                <div className="absolute w-2 h-2 rounded-full bg-blue-500 top-0 left-8"></div>
                <div className="absolute w-2 h-2 rounded-full bg-blue-500 top-4 left-0"></div>
                <div className="absolute w-2 h-2 rounded-full bg-blue-500 top-4 left-4"></div>
                <div className="absolute w-2 h-2 rounded-full bg-blue-500 top-4 left-8"></div>
                <div className="absolute w-2 h-2 rounded-full bg-blue-500 top-8 left-0"></div>
                <div className="absolute w-2 h-2 rounded-full bg-blue-500 top-8 left-4"></div>
                <div className="absolute w-2 h-2 rounded-full bg-blue-500 top-8 left-8"></div>
              </div>

              <div className="flex items-center mb-8 relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mr-4 shadow-lg shadow-blue-500/20">
                  <LineChart className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Market Insights</span>
                </h3>
              </div>

              <div className="space-y-6 relative">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-xl bg-gradient-to-br from-blue-900/10 to-blue-800/5 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/5 hover:-translate-y-1"
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mr-4 backdrop-blur-sm">
                      <LineChart className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-2 text-blue-100">
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
                  className="p-5 rounded-xl bg-gradient-to-br from-cyan-900/10 to-cyan-800/5 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-md hover:shadow-cyan-500/5 hover:-translate-y-1"
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mr-4 backdrop-blur-sm">
                      <BarChart3 className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-2 text-cyan-100">
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
                  className="p-5 rounded-xl bg-gradient-to-br from-indigo-900/10 to-indigo-800/5 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-md hover:shadow-indigo-500/5 hover:-translate-y-1"
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-blue-500/20 flex items-center justify-center mr-4 backdrop-blur-sm">
                      <TrendingUp className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-2 text-indigo-100">
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
      </div>
    </section>
  );
}
