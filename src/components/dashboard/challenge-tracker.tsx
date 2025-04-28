"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { AnchorIcon, CrownIcon, WhaleIcon } from "@/components/icons/challenge-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import {
  BarChart3, CheckCircle2, Clock, ExternalLink, LineChart as LineChartIcon,
  PieChart as PieChartIcon, Target, TrendingDown, TrendingUp, Trophy, XCircle
} from "lucide-react";

interface Challenge {
  id: string;
  type: "WHALE_HUNTER" | "DEEP_OCEAN" | "BLUE_WHALE";
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  startDate: string | null;
  endDate: string | null;
  targetProfit: number;
  maxDrawdown: number;
  currentProfit: number;
  currentDrawdown: number;
  progressPercent: number;
  accountSize: number;
  profitShare: number;
  // Additional performance metrics
  trades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  averageWin: number;
  averageLoss: number;
  profitFactor: number;
  dailyPerformance: { date: string; profit: number }[];
  instrumentPerformance: { instrument: string; profit: number; trades: number }[];
}

const challengeConfig = {
  WHALE_HUNTER: {
    icon: WhaleIcon,
    name: "Whale Hunter",
    gradientFrom: "#0ea5e9", // Sky blue
    gradientTo: "#06b6d4", // Cyan
  },
  DEEP_OCEAN: {
    icon: AnchorIcon,
    name: "Deep Ocean",
    gradientFrom: "#6366f1", // Indigo
    gradientTo: "#8b5cf6", // Violet
  },
  BLUE_WHALE: {
    icon: CrownIcon,
    name: "Blue Whale",
    gradientFrom: "#0284c7", // Blue
    gradientTo: "#0891b2", // Cyan
  },
};

const statusConfig = {
  NOT_STARTED: {
    color: "bg-gray-500",
    label: "Not Started",
    icon: Clock,
  },
  IN_PROGRESS: {
    color: "bg-blue-500",
    label: "In Progress",
    icon: TrendingUp,
  },
  COMPLETED: {
    color: "bg-green-500",
    label: "Completed",
    icon: CheckCircle2,
  },
  FAILED: {
    color: "bg-red-500",
    label: "Failed",
    icon: XCircle,
  },
};

export function ChallengeTracker() {
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      if (!accessToken) return;

      try {
        const response = await fetch("/api/user/challenges", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch challenge data");
        }

        const data = await response.json();
        setChallenges(data.challenges);
      } catch (error) {
        console.error("Error fetching challenges:", error);
        toast.error("Failed to load challenge data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, [accessToken]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (challenges.length === 0) {
    return (
      <GlassCard>
        <div className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">No Challenges Found</h3>
          <p className="text-muted-foreground mb-4">
            You haven't started any trading challenges yet.
          </p>
          <Button>Start Your First Challenge</Button>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard>
          <div className="p-4">
            <div className="text-sm text-muted-foreground mb-2">Active Challenges</div>
            <div className="text-2xl font-bold">
              {challenges.filter(c => c.status === "IN_PROGRESS").length}
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-4">
            <div className="text-sm text-muted-foreground mb-2">Completed Challenges</div>
            <div className="text-2xl font-bold">
              {challenges.filter(c => c.status === "COMPLETED").length}
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-4">
            <div className="text-sm text-muted-foreground mb-2">Success Rate</div>
            <div className="text-2xl font-bold">
              {challenges.length > 0
                ? `${Math.round((challenges.filter(c => c.status === "COMPLETED").length / challenges.filter(c => c.status === "COMPLETED" || c.status === "FAILED").length) * 100 || 0)}%`
                : "0%"}
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Your Challenges</h3>

        {challenges.map((challenge) => {
          const config = challengeConfig[challenge.type];
          const status = statusConfig[challenge.status];
          const StatusIcon = status.icon;
          const Icon = config.icon;

          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard className="overflow-hidden">
                <div
                  className="h-2"
                  style={{
                    background: `linear-gradient(to right, ${config.gradientFrom}, ${config.gradientTo})`,
                  }}
                ></div>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                        style={{
                          background: `linear-gradient(135deg, ${config.gradientFrom}30, ${config.gradientTo}30)`,
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{config.name} Challenge</h3>
                        <div className="flex items-center mt-1">
                          <Badge
                            className={`${status.color} text-white`}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {status.label}
                          </Badge>
                          {challenge.startDate && (
                            <span className="text-xs text-muted-foreground ml-2">
                              Started: {new Date(challenge.startDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Account Size</div>
                        <div className="font-bold">${challenge.accountSize.toLocaleString()}</div>
                      </div>
                      <div className="ml-6 text-right">
                        <div className="text-sm text-muted-foreground">Profit Share</div>
                        <div className="font-bold">{challenge.profitShare}%</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <Target className="w-4 h-4 mr-1 text-muted-foreground" />
                          <span className="text-sm">Profit Target: ${challenge.targetProfit.toLocaleString()}</span>
                        </div>
                        <span className="text-sm font-medium">
                          ${challenge.currentProfit.toLocaleString()} ({Math.round((challenge.currentProfit / challenge.targetProfit) * 100)}%)
                        </span>
                      </div>
                      <Progress value={(challenge.currentProfit / challenge.targetProfit) * 100} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <TrendingDown className="w-4 h-4 mr-1 text-muted-foreground" />
                          <span className="text-sm">Max Drawdown: ${challenge.maxDrawdown.toLocaleString()}</span>
                        </div>
                        <span className="text-sm font-medium">
                          ${challenge.currentDrawdown.toLocaleString()} ({Math.round((challenge.currentDrawdown / challenge.maxDrawdown) * 100)}%)
                        </span>
                      </div>
                      <Progress value={(challenge.currentDrawdown / challenge.maxDrawdown) * 100} className="h-2 bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-full bg-yellow-500 rounded-full"
                          style={{ width: `${(challenge.currentDrawdown / challenge.maxDrawdown) * 100}%` }}
                        ></div>
                      </Progress>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="mb-4 md:mb-0">
                      <div className="text-sm text-muted-foreground mb-1">Overall Progress</div>
                      <div className="flex items-center">
                        <Progress value={challenge.progressPercent} className="w-32 h-2 mr-3" />
                        <span className="text-sm font-medium">{Math.round(challenge.progressPercent)}%</span>
                      </div>
                    </div>

                    {challenge.status === "COMPLETED" && (
                      <div className="flex items-center text-green-500">
                        <Trophy className="w-5 h-5 mr-2" />
                        <span className="font-medium">Challenge Completed Successfully!</span>
                      </div>
                    )}

                    {challenge.status === "IN_PROGRESS" && (
                      <Button
                        size="sm"
                        style={{
                          background: `linear-gradient(to right, ${config.gradientFrom}, ${config.gradientTo})`,
                        }}
                      >
                        View Trading Dashboard
                      </Button>
                    )}

                    {challenge.status === "NOT_STARTED" && (
                      <Button
                        size="sm"
                        style={{
                          background: `linear-gradient(to right, ${config.gradientFrom}, ${config.gradientTo})`,
                        }}
                      >
                        Start Challenge
                      </Button>
                    )}
                  </div>

                  {challenge.status !== "NOT_STARTED" && (
                    <div className="mt-6 border-t border-border/40 pt-6">
                      <Tabs defaultValue="performance" className="w-full">
                        <TabsList className="mb-4">
                          <TabsTrigger value="performance" className="flex items-center">
                            <LineChartIcon className="w-4 h-4 mr-2" />
                            <span>Performance</span>
                          </TabsTrigger>
                          <TabsTrigger value="statistics" className="flex items-center">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            <span>Statistics</span>
                          </TabsTrigger>
                          <TabsTrigger value="instruments" className="flex items-center">
                            <PieChartIcon className="w-4 h-4 mr-2" />
                            <span>Instruments</span>
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="performance" className="mt-0">
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart
                                data={challenge.dailyPerformance}
                                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                              >
                                <defs>
                                  <linearGradient id={`colorProfit-${challenge.id}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={config.gradientFrom} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={config.gradientFrom} stopOpacity={0} />
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
                                  tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                  formatter={(value: number) => [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Profit']}
                                  labelFormatter={(label) => {
                                    const date = new Date(label);
                                    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                                  }}
                                />
                                <Area
                                  type="monotone"
                                  dataKey="profit"
                                  stroke={config.gradientFrom}
                                  fillOpacity={1}
                                  fill={`url(#colorProfit-${challenge.id})`}
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </TabsContent>

                        <TabsContent value="statistics" className="mt-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Total Trades</span>
                                <span className="font-medium">{challenge.trades}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Winning Trades</span>
                                <span className="font-medium text-green-500">{challenge.winningTrades}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Losing Trades</span>
                                <span className="font-medium text-red-500">{challenge.losingTrades}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Win Rate</span>
                                <span className="font-medium">{challenge.winRate.toFixed(2)}%</span>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Average Win</span>
                                <span className="font-medium text-green-500">${challenge.averageWin.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Average Loss</span>
                                <span className="font-medium text-red-500">${challenge.averageLoss.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Profit Factor</span>
                                <span className="font-medium">{challenge.profitFactor.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Current Profit</span>
                                <span className="font-medium">${challenge.currentProfit.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="instruments" className="mt-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="h-64">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={challenge.instrumentPerformance}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="profit"
                                    nameKey="instrument"
                                    label={({ instrument, percent }) => `${instrument} ${(percent * 100).toFixed(0)}%`}
                                  >
                                    {challenge.instrumentPerformance.map((entry, index) => (
                                      <Cell
                                        key={`cell-${index}`}
                                        fill={entry.profit >= 0 ?
                                          `hsl(${210 + index * 30}, 70%, 50%)` :
                                          `hsl(${0 + index * 30}, 70%, 50%)`
                                        }
                                      />
                                    ))}
                                  </Pie>
                                  <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Profit']} />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                            <div className="space-y-3">
                              {challenge.instrumentPerformance.map((instrument, index) => (
                                <div key={index} className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div
                                      className="w-3 h-3 rounded-full mr-2"
                                      style={{
                                        backgroundColor: instrument.profit >= 0 ?
                                          `hsl(${210 + index * 30}, 70%, 50%)` :
                                          `hsl(${0 + index * 30}, 70%, 50%)`
                                      }}
                                    ></div>
                                    <span className="text-sm">{instrument.instrument}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className={`text-sm font-medium ${instrument.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                      ${instrument.profit.toFixed(2)}
                                    </span>
                                    <span className="text-xs text-muted-foreground ml-2">
                                      ({instrument.trades} trades)
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
