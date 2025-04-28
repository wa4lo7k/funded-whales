import { NextRequest, NextResponse } from 'next/server';
import { JwtPayload, verifyJwt } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { ChallengeType, PaymentMethod, PaymentStatus } from '@prisma/client';

// Mock data for payments
const mockPayments = [
  {
    amount: 99,
    currency: "USD",
    status: PaymentStatus.COMPLETED,
    method: PaymentMethod.USDT_BEP20,
    transactionId: "0x1a2b3c4d5e6f7g8h9i0j",
    walletAddress: "0xaBcD1234eFgH5678iJkL9012mNoP3456qRsT7890",
    paymentDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000), // 35 days ago
    expiresAt: null,
  },
  {
    amount: 199,
    currency: "USD",
    status: PaymentStatus.PENDING,
    method: PaymentMethod.USDT_BEP20,
    transactionId: null,
    walletAddress: "0xaBcD1234eFgH5678iJkL9012mNoP3456qRsT7890",
    paymentDate: null,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
  },
];

// USDT-BEP20 wallet address for payments
export const usdtWalletAddress = "0x1234567890abcdef1234567890abcdef12345678";

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
    
    // Check if the user has payments
    let payments = await prisma.payment.findMany({
      where: {
        userId: payload.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        challenge: true,
      },
    });
    
    // If no payments exist, create mock payments
    if (payments.length === 0) {
      // First, get the user's challenges
      const challenges = await prisma.challenge.findMany({
        where: {
          userId: payload.userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      
      if (challenges.length > 0) {
        // Create payments linked to challenges
        const paymentPromises = mockPayments.map((payment, index) => {
          if (index < challenges.length) {
            return prisma.payment.create({
              data: {
                ...payment,
                userId: payload.userId,
                challengeId: challenges[index].id,
              },
              include: {
                challenge: true,
              },
            });
          }
          return null;
        }).filter(Boolean);
        
        payments = await Promise.all(paymentPromises);
      } else {
        // Create payments without challenges
        const paymentPromises = mockPayments.map(payment => 
          prisma.payment.create({
            data: {
              ...payment,
              userId: payload.userId,
            },
            include: {
              challenge: true,
            },
          })
        );
        
        payments = await Promise.all(paymentPromises);
      }
    }
    
    return NextResponse.json({ 
      payments,
      walletAddress: usdtWalletAddress,
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
