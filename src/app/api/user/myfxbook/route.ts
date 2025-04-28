import { NextRequest, NextResponse } from 'next/server';
import { JwtPayload, verifyJwt } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

// Mock data for MyFXBook account
const mockMyFXBookAccount = {
  id: "mfxb-123456",
  name: "Trading Account",
  accountId: "1234567",
  connected: true,
  lastSync: new Date().toISOString(),
  balance: 10245.78,
  equity: 10356.92,
  profit: 1245.78,
  profitPercent: 12.45,
  drawdown: 245.67,
  drawdownPercent: 2.4,
  deposits: 9000,
  withdrawals: 0,
  leverage: 100,
  pips: 1245.5,
  trades: 87,
  winRate: 68.5,
  averageWin: 32.45,
  averageLoss: 18.76,
  profitFactor: 1.73,
  sharpeRatio: 1.25,
  dailyGrowth: [0.2, 0.5, -0.3, 0.8, 0.4, -0.1, 0.6, 0.3, -0.2, 0.7, 0.5, 0.2, 0.4, -0.3],
  equityChart: generateEquityChartData(),
  balanceChart: generateBalanceChartData(),
  monthlyPerformance: [
    { month: "Jan", profit: 245.67 },
    { month: "Feb", profit: 312.45 },
    { month: "Mar", profit: -124.56 },
    { month: "Apr", profit: 456.78 },
    { month: "May", profit: 234.56 },
    { month: "Jun", profit: 121.23 },
  ],
  instrumentPerformance: [
    { instrument: "EURUSD", profit: 456.78, trades: 23 },
    { instrument: "GBPUSD", profit: 234.56, trades: 18 },
    { instrument: "USDJPY", profit: -124.56, trades: 15 },
    { instrument: "XAUUSD", profit: 345.67, trades: 12 },
    { instrument: "BTCUSD", profit: 123.45, trades: 8 },
    { instrument: "ETHUSD", profit: -78.90, trades: 6 },
    { instrument: "US30", profit: 189.34, trades: 5 },
  ],
};

function generateEquityChartData() {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  
  let equity = 9000;
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Random daily change between -1% and +1.5%
    const change = equity * (Math.random() * 0.025 - 0.01);
    equity += change;
    
    data.push({
      date: date.toISOString(),
      equity: parseFloat(equity.toFixed(2)),
    });
  }
  
  return data;
}

function generateBalanceChartData() {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  
  let balance = 9000;
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Balance changes less frequently than equity
    if (i % 3 === 0) {
      // Random change between -0.5% and +1%
      const change = balance * (Math.random() * 0.015 - 0.005);
      balance += change;
    }
    
    data.push({
      date: date.toISOString(),
      balance: parseFloat(balance.toFixed(2)),
    });
  }
  
  return data;
}

export async function GET(req: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Verify the token
    const token = authHeader.split(' ')[1];
    const payload = verifyJwt<JwtPayload>(token);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check if the user has a MyFXBook account
    let myfxbookAccount = await prisma.myfxbookAccount.findFirst({
      where: {
        userId: payload.userId,
      },
    });
    
    // If no MyFXBook account exists, return null (user needs to connect)
    if (!myfxbookAccount) {
      return NextResponse.json({ account: null });
    }
    
    // In a real implementation, you would fetch the latest data from MyFXBook API
    // For now, we'll use mock data
    return NextResponse.json({
      account: {
        ...mockMyFXBookAccount,
        id: myfxbookAccount.id,
        name: myfxbookAccount.name,
        accountId: myfxbookAccount.accountId,
        connected: myfxbookAccount.connected,
        lastSync: myfxbookAccount.lastSync,
      },
    });
  } catch (error) {
    console.error('Error fetching MyFXBook account:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
