"use client";

import { ProfitSplitCalculator } from "@/components/dashboard/profit-split-calculator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CalculatorPage() {
  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mb-2">Profit Split Calculator</h1>
        <p className="text-muted-foreground max-w-2xl">
          Calculate your potential profit share based on your account size, profit percentage, and challenge type.
          This calculator helps you understand how profits are split between you and the platform.
        </p>
      </div>

      <div className="mb-12">
        <ProfitSplitCalculator />
      </div>

      <div className="bg-muted/30 rounded-lg p-6 max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-1">1. Select Your Challenge Type</h3>
            <p className="text-sm text-muted-foreground">
              Choose between Whale Hunter (80% profit share), Deep Ocean (85% profit share), or Blue Whale (90% profit share).
              Each challenge type comes with a different account size and profit sharing structure.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">2. Enter Your Account Size</h3>
            <p className="text-sm text-muted-foreground">
              The account size is pre-filled based on your selected challenge type, but you can adjust it if needed.
              Whale Hunter starts at $10,000, Deep Ocean at $25,000, and Blue Whale at $50,000.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">3. Set Your Profit Percentage</h3>
            <p className="text-sm text-muted-foreground">
              Enter the percentage profit you expect to make on your trading account.
              The default is 8%, which is the target profit for most challenges.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">4. View Your Profit Split</h3>
            <p className="text-sm text-muted-foreground">
              The calculator will show you the total profit amount, your share, and the platform's share.
              The pie chart visualizes the split to help you understand the distribution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
