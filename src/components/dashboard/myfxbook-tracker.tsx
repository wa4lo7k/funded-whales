"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, Cell, PieChart, Pie, Legend
} from "recharts";
import { 
  ArrowDown, ArrowUp, BarChart3, ChevronDown, 
  DollarSign, ExternalLink, Percent, RefreshCw, TrendingUp 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MyFXBookAccount {
  id: string;
  name: string;
  accountId: string;
  connected: boolean;
  lastSync: string;
  balance: number;
  equity: number;
  profit: number;
  profitPercent: number;
  drawdown: number;
  drawdownPercent: number;
  deposits: number;
  withdrawals: number;
  leverage: number;
  pips: number;
  trades: number;
  winRate: number;
  averageWin: number;
  averageLoss: number;
  profitFactor: number;
  sharpeRatio: number;
  dailyGrowth: number[];
  equityChart: { date: string; equity: number }[];
  balanceChart: { date: string; balance: number }[];
  monthlyPerformance: { month: string; profit: number }[];
  instrumentPerformance: { instrument: string; profit: number; trades: number }[];
}

export function MyFXBookTracker() {
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState<MyFXBookAccount | null>(null);
  const [showConnect, setShowConnect] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    accountId: "",
  });

  useEffect(() => {
    fetchMyFXBookAccount();
  }, [accessToken]);

  const fetchMyFXBookAccount = async () => {
    if (!accessToken) return;
    
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/myfxbook", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch MyFXBook account data");
      }

      const data = await response.json();
      setAccount(data.account);
      setShowConnect(!data.account?.connected);
    } catch (error) {
      console.error("Error fetching MyFXBook account:", error);
      toast.error("Failed to load MyFXBook account data");
      setShowConnect(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;
    
    setIsConnecting(true);
    try {
      const response = await fetch("/api/user/myfxbook/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Failed to connect MyFXBook account");
      }

      toast.success("MyFXBook account connected successfully");
      setShowConnect(false);
      fetchMyFXBookAccount();
    } catch (error) {
      console.error("Error connecting MyFXBook account:", error);
      toast.error("Failed to connect MyFXBook account");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSync = async () => {
    if (!accessToken) return;
    
    try {
      const response = await fetch("/api/user/myfxbook/sync", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to sync MyFXBook account");
      }

      toast.success("MyFXBook account synced successfully");
      fetchMyFXBookAccount();
    } catch (error) {
      console.error("Error syncing MyFXBook account:", error);
      toast.error("Failed to sync MyFXBook account");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (showConnect) {
    return (
      <GlassCard>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Connect MyFXBook Account</h3>
          <p className="text-muted-foreground mb-6">
            Connect your MyFXBook account to track your trading performance and analytics.
          </p>
          
          <form onSubmit={handleConnect} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">MyFXBook Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="password">MyFXBook Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="accountId">MyFXBook Account ID</Label>
              <Input
                id="accountId"
                placeholder="e.g. 1234567"
                value={credentials.accountId}
                onChange={(e) => setCredentials({ ...credentials, accountId: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                You can find your Account ID in your MyFXBook dashboard URL
              </p>
            </div>
            
            <Button type="submit" className="w-full" disabled={isConnecting}>
              {isConnecting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Connecting...
                </>
              ) : (
                "Connect Account"
              )}
            </Button>
          </form>
        </div>
      </GlassCard>
    );
  }

  if (!account) {
    return (
      <GlassCard>
        <div className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">No MyFXBook Account Found</h3>
          <p className="text-muted-foreground mb-4">
            You haven't connected a MyFXBook account yet.
          </p>
          <Button onClick={() => setShowConnect(true)}>Connect Account</Button>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold">MyFXBook Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Last synced: {new Date(account.lastSync).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSync}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={`https://www.myfxbook.com/members/overview`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open MyFXBook
            </a>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard>
          <div className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Balance</div>
            <div className="text-2xl font-bold">${account.balance.toLocaleString()}</div>
            <div className="flex items-center mt-1">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground ml-1">Equity: ${account.equity.toLocaleString()}</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Profit</div>
            <div className={`text-2xl font-bold ${account.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ${account.profit.toLocaleString()}
            </div>
            <div className="flex items-center mt-1">
              <Percent className="h-4 w-4 text-muted-foreground" />
              <span className={`text-xs ml-1 ${account.profitPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {account.profitPercent.toFixed(2)}%
              </span>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Drawdown</div>
            <div className="text-2xl font-bold text-amber-500">
              {account.drawdownPercent.toFixed(2)}%
            </div>
            <div className="flex items-center mt-1">
              <ArrowDown className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground ml-1">
                ${account.drawdown.toLocaleString()}
              </span>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Win Rate</div>
            <div className="text-2xl font-bold">
              {account.winRate.toFixed(1)}%
            </div>
            <div className="flex items-center mt-1">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground ml-1">
                {account.trades} trades
              </span>
            </div>
          </div>
        </GlassCard>
      </div>

      <Tabs defaultValue="equity" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="equity">Equity Chart</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Performance</TabsTrigger>
          <TabsTrigger value="instruments">Instruments</TabsTrigger>
          <TabsTrigger value="stats">Advanced Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="equity" className="mt-0">
          <GlassCard>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Equity Growth</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={account.equityChart}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
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
                      formatter={(value: number) => [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Equity']}
                      labelFormatter={(label) => {
                        const date = new Date(label);
                        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="equity" 
                      stroke="var(--primary)" 
                      fillOpacity={1} 
                      fill="url(#colorEquity)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="monthly" className="mt-0">
          <GlassCard>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Monthly Performance</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={account.monthlyPerformance}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="month" />
                    <YAxis 
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Profit']}
                    />
                    <Bar 
                      dataKey="profit" 
                      fill="var(--primary)" 
                      radius={[4, 4, 0, 0]}
                    >
                      {account.monthlyPerformance.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.profit >= 0 ? 'var(--primary)' : 'var(--destructive)'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="instruments" className="mt-0">
          <GlassCard>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Instrument Performance</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={account.instrumentPerformance}
                    layout="vertical"
                    margin={{ top: 5, right: 20, left: 50, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis 
                      type="number"
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="instrument" 
                    />
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Profit']}
                    />
                    <Bar 
                      dataKey="profit" 
                      fill="var(--primary)" 
                      radius={[0, 4, 4, 0]}
                    >
                      {account.instrumentPerformance.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.profit >= 0 ? 'var(--primary)' : 'var(--destructive)'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="stats" className="mt-0">
          <GlassCard>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Advanced Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Trades</span>
                    <span className="font-medium">{account.trades}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Win Rate</span>
                    <span className="font-medium">{account.winRate.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Win</span>
                    <span className="font-medium text-green-500">${account.averageWin.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Loss</span>
                    <span className="font-medium text-red-500">${account.averageLoss.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Profit Factor</span>
                    <span className="font-medium">{account.profitFactor.toFixed(2)}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
                    <span className="font-medium">{account.sharpeRatio.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Leverage</span>
                    <span className="font-medium">{account.leverage}:1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Pips</span>
                    <span className="font-medium">{account.pips.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Deposits</span>
                    <span className="font-medium">${account.deposits.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Withdrawals</span>
                    <span className="font-medium">${account.withdrawals.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
