import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { JwtPayload, verifyJwt } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { refreshToken } = body;
    
    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token is required' },
        { status: 400 }
      );
    }
    
    // Verify the refresh token
    const payload = verifyJwt<JwtPayload>(refreshToken);
    
    if (payload) {
      // Delete the refresh token from the database
      await prisma.refreshToken.deleteMany({
        where: {
          token: refreshToken,
          userId: payload.userId,
        },
      });
      
      // Delete all sessions for this user
      await prisma.session.deleteMany({
        where: {
          userId: payload.userId,
        },
      });
    }
    
    return NextResponse.json({
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
