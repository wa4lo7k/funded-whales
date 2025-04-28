"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, Cell, PieChart, Pie, Legend
} from "recharts";
import { ArrowDown, ArrowUp, DollarSign, Percent, TrendingUp } from "lucide-react";

interface TradingAccount {
  id: string;
  accountNumber: string;
  balance: number;
  equity: number;
  profit: number;
  drawdown: number;
  winRate: number;
  tradesCount: number;
  winningTrades: number;
  losingTrades: number;
  averageWin: number;
  averageLoss: number;
  lastTradeDate: string;
  isActive: boolean;
}

interface TradingHistory {
  date: string;
  balance: number;
}

export function TradingStats() {
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [tradingAccount, setTradingAccount] = useState<TradingAccount | null>(null);
  const [tradingHistory, setTradingHistory] = useState<TradingHistory[]>([]);

  useEffect(() => {
    const fetchTradingAccount = async () => {
      if (!accessToken) return;

      try {
        const response = await fetch("/api/user/trading-account", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch trading account data");
        }

        const data = await response.json();
        setTradingAccount(data.tradingAccount);
        setTradingHistory(data.tradingHistory);
      } catch (error) {
        console.error("Error fetching trading account:", error);
        toast.error("Failed to load trading account data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTradingAccount();
  }, [accessToken]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!tradingAccount) {
    return (
      <GlassCard>
        <div className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">No Trading Account Found</h3>
          <p className="text-muted-foreground">
            You don't have an active trading account yet. Start a challenge to get one.
          </p>
        </div>
      </GlassCard>
    );
  }

  // Prepare data for win/loss pie chart
  const winLossData = [
    { name: "Winning", value: tradingAccount.winningTrades, color: "#10b981" },
    { name: "Losing", value: tradingAccount.losingTrades, color: "#ef4444" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm text-muted-foreground">Account Balance</div>
              <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                Live
              </div>
            </div>
            <div className="flex items-baseline">
              <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
              <div className="text-2xl font-bold">{tradingAccount.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Account #{tradingAccount.accountNumber}
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-4">
            <div className="text-sm text-muted-foreground mb-2">Profit/Loss</div>
            <div className="flex items-baseline">
              <div className={`text-2xl font-bold ${tradingAccount.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {tradingAccount.profit >= 0 ? '+' : ''}{tradingAccount.profit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs">
              {tradingAccount.profit >= 0 ? (
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={`${tradingAccount.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs((tradingAccount.profit / (tradingAccount.balance - tradingAccount.profit) * 100)).toFixed(2)}%
              </span>
              <span className="text-muted-foreground ml-1">from initial</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-4">
            <div className="text-sm text-muted-foreground mb-2">Win Rate</div>
            <div className="flex items-baseline">
              <Percent className="h-4 w-4 text-muted-foreground mr-1" />
              <div className="text-2xl font-bold">{tradingAccount.winRate.toFixed(1)}</div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {tradingAccount.winningTrades} wins / {tradingAccount.losingTrades} losses
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-4">
            <div className="text-sm text-muted-foreground mb-2">Max Drawdown</div>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold">{tradingAccount.drawdown.toFixed(2)}%</div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Current equity: ${tradingAccount.equity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Account Balance History</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={tradingHistory}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }} 
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getDate()}/${date.getMonth() + 1}`;
                    }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    domain={[(dataMin: number) => Math.floor(dataMin * 0.995), (dataMax: number) => Math.ceil(dataMax * 1.005)]}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Balance']}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="var(--primary)" 
                    fillOpacity={1} 
                    fill="url(#colorBalance)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Win/Loss Ratio</h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={winLossData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {winLossData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [value, 'Trades']}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Trading Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Average Win</span>
                  <span className="text-sm font-medium text-green-500">
                    +${tradingAccount.averageWin.toFixed(2)}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${(tradingAccount.averageWin / (tradingAccount.averageWin + Math.abs(tradingAccount.averageLoss))) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Average Loss</span>
                  <span className="text-sm font-medium text-red-500">
                    -${Math.abs(tradingAccount.averageLoss).toFixed(2)}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500 rounded-full" 
                    style={{ width: `${(Math.abs(tradingAccount.averageLoss) / (tradingAccount.averageWin + Math.abs(tradingAccount.averageLoss))) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Risk/Reward Ratio</span>
                  <span className="text-sm font-medium">
                    1:{(tradingAccount.averageWin / Math.abs(tradingAccount.averageLoss)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Trading Activity</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Trades</span>
                <span className="font-medium">{tradingAccount.tradesCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Winning Trades</span>
                <span className="font-medium text-green-500">{tradingAccount.winningTrades}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Losing Trades</span>
                <span className="font-medium text-red-500">{tradingAccount.losingTrades}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Last Trade</span>
                <span className="font-medium">
                  {tradingAccount.lastTradeDate 
                    ? new Date(tradingAccount.lastTradeDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) 
                    : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Account Status</span>
                <span className={`font-medium ${tradingAccount.isActive ? 'text-green-500' : 'text-red-500'}`}>
                  {tradingAccount.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
