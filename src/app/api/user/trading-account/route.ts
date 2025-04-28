import { NextRequest, NextResponse } from 'next/server';
import { JwtPayload, verifyJwt } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { ChallengeType, TradingAccount } from '@prisma/client';

// Mock data for trading account statistics
const mockTradingAccountData = {
  accountNumber: "FD-123456",
  balance: 10245.78,
  equity: 10356.92,
  profit: 245.78,
  drawdown: 2.4,
  winRate: 68.5,
  tradesCount: 35,
  winningTrades: 24,
  losingTrades: 11,
  averageWin: 32.45,
  averageLoss: 18.76,
  lastTradeDate: new Date(),
  isActive: true,
};

// Mock data for trading history
export const mockTradingHistory = [
  { date: '2023-04-01', balance: 10000.00 },
  { date: '2023-04-02', balance: 10045.23 },
  { date: '2023-04-03', balance: 10078.45 },
  { date: '2023-04-04', balance: 10056.78 },
  { date: '2023-04-05', balance: 10112.34 },
  { date: '2023-04-06', balance: 10098.67 },
  { date: '2023-04-07', balance: 10134.56 },
  { date: '2023-04-08', balance: 10187.89 },
  { date: '2023-04-09', balance: 10165.43 },
  { date: '2023-04-10', balance: 10198.76 },
  { date: '2023-04-11', balance: 10245.78 },
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
    
    // Check if the user has a trading account
    let tradingAccount = await prisma.tradingAccount.findFirst({
      where: {
        userId: payload.userId,
      },
      include: {
        challenge: true,
      },
    });
    
    // If no trading account exists, create one with mock data
    if (!tradingAccount) {
      tradingAccount = await prisma.tradingAccount.create({
        data: {
          ...mockTradingAccountData,
          userId: payload.userId,
        },
        include: {
          challenge: true,
        },
      });
    }
    
    return NextResponse.json({
      tradingAccount,
      tradingHistory: mockTradingHistory,
    });
  } catch (error) {
    console.error('Error fetching trading account:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
