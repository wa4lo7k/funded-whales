"use client";

import { useAuth } from "@/contexts/auth-context";
import { GlassCard } from "@/components/ui/glass-card";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TradingStats } from "@/components/dashboard/trading-stats";
import { ChallengeTracker } from "@/components/dashboard/challenge-tracker";
import { PaymentProcessor } from "@/components/dashboard/payment-processor";
import { TradingViewChart } from "@/components/dashboard/tradingview-chart";
import { MyFXBookTracker } from "@/components/dashboard/myfxbook-tracker";
import { ProfitSplitCalculator } from "@/components/dashboard/profit-split-calculator";
import {
  Activity, BarChart3, Calculator, CreditCard, LineChart,
  PieChart, Trophy, User
} from "lucide-react";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("trading");

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/login");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Trader Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || "Trader"}!
          </p>
        </div>

        <GlassCard className="p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="font-medium">{user?.name || "Trader"}</div>
            <div className="text-xs text-muted-foreground">{user?.email}</div>
          </div>
          <div className="ml-4 pl-4 border-l border-[var(--border)]">
            <div className="text-xs text-muted-foreground">Account Type</div>
            <div className="text-sm font-medium">
              {user?.role === "ADMIN" ? "Administrator" : "Trader"}
            </div>
          </div>
        </GlassCard>
      </div>

      <Tabs defaultValue="trading" className="w-full" onValueChange={setActiveTab}>
        <div className="mb-8">
          <TabsList className="grid grid-cols-6">
            <TabsTrigger value="trading" className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              <span>Trading Stats</span>
            </TabsTrigger>
            <TabsTrigger value="charts" className="flex items-center">
              <LineChart className="w-4 h-4 mr-2" />
              <span>Charts</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="calculator" className="flex items-center">
              <Calculator className="w-4 h-4 mr-2" />
              <span>Calculator</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center">
              <Trophy className="w-4 h-4 mr-2" />
              <span>Challenges</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              <span>Payments</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="trading" className="mt-0">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Trading Account Statistics</h2>
            <p className="text-muted-foreground">
              Monitor your trading performance and account metrics.
            </p>
          </div>
          <TradingStats />
        </TabsContent>

        <TabsContent value="charts" className="mt-0">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Market Charts</h2>
            <p className="text-muted-foreground">
              Real-time market analysis with TradingView charts.
            </p>
          </div>
          <TradingViewChart height={600} />
        </TabsContent>

        <TabsContent value="analytics" className="mt-0">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">MyFXBook Analytics</h2>
            <p className="text-muted-foreground">
              Detailed trading performance analytics and account tracking.
            </p>
          </div>
          <MyFXBookTracker />
        </TabsContent>

        <TabsContent value="calculator" className="mt-0">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Profit Split Calculator</h2>
            <p className="text-muted-foreground">
              Calculate your profit share based on account size and performance.
            </p>
          </div>
          <ProfitSplitCalculator />
        </TabsContent>

        <TabsContent value="challenges" className="mt-0">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Challenge Progression</h2>
            <p className="text-muted-foreground">
              Track your progress in trading challenges and view achievements.
            </p>
          </div>
          <ChallengeTracker />
        </TabsContent>

        <TabsContent value="payments" className="mt-0">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Payment Processing</h2>
            <p className="text-muted-foreground">
              Manage payments for challenges and view transaction history.
            </p>
          </div>
          <PaymentProcessor />
        </TabsContent>
      </Tabs>
    </div>
  );
}
