import { NextRequest, NextResponse } from 'next/server';
import { JwtPayload, verifyJwt } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { ChallengeStatus, ChallengeType } from '@prisma/client';

// Helper function to generate daily performance data
function generateDailyPerformance(startDate: Date | null, status: ChallengeStatus, profit: number) {
  if (!startDate || status === ChallengeStatus.NOT_STARTED) {
    return [];
  }

  const data = [];
  const days = status === ChallengeStatus.COMPLETED ? 20 : 15;
  const startPoint = new Date(startDate);

  let cumulativeProfit = 0;
  const dailyTarget = profit / days;

  for (let i = 0; i < days; i++) {
    const date = new Date(startPoint);
    date.setDate(date.getDate() + i);

    // Random daily profit between -dailyTarget and 2*dailyTarget
    let dailyProfit;
    if (status === ChallengeStatus.COMPLETED) {
      // More likely to be positive for completed challenges
      dailyProfit = dailyTarget * (0.5 + Math.random() * 1.5);
    } else {
      // More variance for in-progress challenges
      dailyProfit = dailyTarget * (Math.random() * 3 - 0.5);
    }

    cumulativeProfit += dailyProfit;

    data.push({
      date: date.toISOString(),
      profit: parseFloat(dailyProfit.toFixed(2)),
    });
  }

  return data;
}

// Helper function to generate instrument performance data
function generateInstrumentPerformance(status: ChallengeStatus, profit: number) {
  if (status === ChallengeStatus.NOT_STARTED) {
    return [];
  }

  const instruments = ["EURUSD", "GBPUSD", "USDJPY", "XAUUSD", "BTCUSD", "US30", "NAS100"];
  const data = [];

  // Select 3-5 random instruments
  const count = Math.floor(Math.random() * 3) + 3;
  const selectedInstruments = instruments.sort(() => 0.5 - Math.random()).slice(0, count);

  let remainingProfit = profit;

  for (let i = 0; i < selectedInstruments.length; i++) {
    const isLast = i === selectedInstruments.length - 1;

    // For the last instrument, use the remaining profit
    let instrumentProfit;
    if (isLast) {
      instrumentProfit = remainingProfit;
    } else {
      // Allocate a random portion of the remaining profit
      const portion = Math.random() * 0.6 + 0.1; // 10% to 70%
      instrumentProfit = remainingProfit * portion;
      remainingProfit -= instrumentProfit;
    }

    // Random number of trades between 5 and 20
    const trades = Math.floor(Math.random() * 16) + 5;

    data.push({
      instrument: selectedInstruments[i],
      profit: parseFloat(instrumentProfit.toFixed(2)),
      trades,
    });
  }

  return data;
}

// Mock data for challenges
const mockChallenges = [
  {
    type: ChallengeType.WHALE_HUNTER,
    status: ChallengeStatus.COMPLETED,
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    endDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    targetProfit: 800,
    maxDrawdown: 500,
    currentProfit: 850,
    currentDrawdown: 320,
    progressPercent: 100,
    accountSize: 10000,
    profitShare: 80,
    trades: 42,
    winningTrades: 28,
    losingTrades: 14,
    winRate: 66.67,
    averageWin: 45.23,
    averageLoss: 22.86,
    profitFactor: 1.98,
    dailyPerformance: generateDailyPerformance(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), ChallengeStatus.COMPLETED, 850),
    instrumentPerformance: generateInstrumentPerformance(ChallengeStatus.COMPLETED, 850),
  },
  {
    type: ChallengeType.DEEP_OCEAN,
    status: ChallengeStatus.IN_PROGRESS,
    startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    endDate: null,
    targetProfit: 2000,
    maxDrawdown: 1250,
    currentProfit: 1200,
    currentDrawdown: 450,
    progressPercent: 60,
    accountSize: 25000,
    profitShare: 85,
    trades: 28,
    winningTrades: 18,
    losingTrades: 10,
    winRate: 64.29,
    averageWin: 92.45,
    averageLoss: 43.67,
    profitFactor: 1.85,
    dailyPerformance: generateDailyPerformance(new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), ChallengeStatus.IN_PROGRESS, 1200),
    instrumentPerformance: generateInstrumentPerformance(ChallengeStatus.IN_PROGRESS, 1200),
  },
  {
    type: ChallengeType.BLUE_WHALE,
    status: ChallengeStatus.NOT_STARTED,
    startDate: null,
    endDate: null,
    targetProfit: 4000,
    maxDrawdown: 2500,
    currentProfit: 0,
    currentDrawdown: 0,
    progressPercent: 0,
    accountSize: 50000,
    profitShare: 90,
    trades: 0,
    winningTrades: 0,
    losingTrades: 0,
    winRate: 0,
    averageWin: 0,
    averageLoss: 0,
    profitFactor: 0,
    dailyPerformance: [],
    instrumentPerformance: [],
  },
];

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

    // Check if the user has challenges
    let challenges = await prisma.challenge.findMany({
      where: {
        userId: payload.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // If no challenges exist, create mock challenges
    if (challenges.length === 0) {
      const challengePromises = mockChallenges.map(challenge =>
        prisma.challenge.create({
          data: {
            ...challenge,
            userId: payload.userId,
          },
        })
      );

      challenges = await Promise.all(challengePromises);
    }

    return NextResponse.json({ challenges });
  } catch (error) {
    console.error('Error fetching challenges:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
