"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Calculator, DollarSign, Percent } from "lucide-react";

// Challenge types with their profit sharing percentages and account sizes
const challengeTypes = [
  {
    id: "WHALE_HUNTER",
    name: "Whale Hunter",
    profitShare: 80,
    accountSize: 10000,
    color: "#0ea5e9", // Sky blue
  },
  {
    id: "DEEP_OCEAN",
    name: "Deep Ocean",
    profitShare: 85,
    accountSize: 25000,
    color: "#6366f1", // Indigo
  },
  {
    id: "BLUE_WHALE",
    name: "Blue Whale",
    profitShare: 90,
    accountSize: 50000,
    color: "#0284c7", // Blue
  },
];

export function ProfitSplitCalculator() {
  const [selectedChallengeType, setSelectedChallengeType] = useState(challengeTypes[0].id);
  const [accountSize, setAccountSize] = useState(challengeTypes[0].accountSize);
  const [profitPercentage, setProfitPercentage] = useState(8);
  const [totalProfit, setTotalProfit] = useState(0);
  const [traderShare, setTraderShare] = useState(0);
  const [platformShare, setPlatformShare] = useState(0);

  // Get the selected challenge type object
  const selectedChallenge = challengeTypes.find(
    (challenge) => challenge.id === selectedChallengeType
  ) || challengeTypes[0];

  // Calculate profit shares when inputs change
  useEffect(() => {
    const calculatedTotalProfit = (accountSize * profitPercentage) / 100;
    const calculatedTraderShare = (calculatedTotalProfit * selectedChallenge.profitShare) / 100;
    const calculatedPlatformShare = calculatedTotalProfit - calculatedTraderShare;

    setTotalProfit(calculatedTotalProfit);
    setTraderShare(calculatedTraderShare);
    setPlatformShare(calculatedPlatformShare);
  }, [selectedChallengeType, accountSize, profitPercentage, selectedChallenge.profitShare]);

  // Handle challenge type change
  const handleChallengeTypeChange = (value: string) => {
    setSelectedChallengeType(value);
    const challenge = challengeTypes.find((c) => c.id === value);
    if (challenge) {
      setAccountSize(challenge.accountSize);
    }
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Data for pie chart
  const pieData = [
    { name: "Trader's Share", value: traderShare, color: selectedChallenge.color },
    { name: "Platform's Share", value: platformShare, color: "#94a3b8" }, // Slate color
  ];

  return (
    <GlassCard className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Calculator className="w-6 h-6 mr-2 text-primary" />
          <h3 className="text-xl font-semibold">Profit Split Calculator</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="challenge-type">Challenge Type</Label>
              <Select
                value={selectedChallengeType}
                onValueChange={handleChallengeTypeChange}
              >
                <SelectTrigger id="challenge-type">
                  <SelectValue placeholder="Select challenge type" />
                </SelectTrigger>
                <SelectContent>
                  {challengeTypes.map((challenge) => (
                    <SelectItem key={challenge.id} value={challenge.id}>
                      {challenge.name} ({challenge.profitShare}% Profit Share)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-size">Account Size ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="account-size"
                  type="number"
                  value={accountSize}
                  onChange={(e) => setAccountSize(Number(e.target.value))}
                  className="pl-9"
                  min={1000}
                  step={1000}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profit-percentage">Profit Percentage (%)</Label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="profit-percentage"
                  type="number"
                  value={profitPercentage}
                  onChange={(e) => setProfitPercentage(Number(e.target.value))}
                  className="pl-9"
                  min={0}
                  step={0.1}
                />
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-sm">Total Profit:</span>
                <span className="font-semibold">{formatCurrency(totalProfit)}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-sm">Your Share ({selectedChallenge.profitShare}%):</span>
                <span className="font-semibold text-green-500">{formatCurrency(traderShare)}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-sm">Platform Share ({100 - selectedChallenge.profitShare}%):</span>
                <span className="font-semibold text-slate-400">{formatCurrency(platformShare)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), 'Amount']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Based on a {formatCurrency(accountSize)} account with {profitPercentage}% profit
              </p>
              <div className="flex justify-center gap-4">
                {pieData.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-xs">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
