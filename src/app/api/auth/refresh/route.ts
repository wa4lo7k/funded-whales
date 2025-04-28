import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { refreshTokenSchema } from '@/lib/validations/auth';
import { ZodError } from 'zod';
import { JwtPayload, signJwtAccessToken, verifyJwt } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = refreshTokenSchema.parse(body);
    
    // Verify the refresh token
    const payload = verifyJwt<JwtPayload>(validatedData.refreshToken);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid refresh token' },
        { status: 401 }
      );
    }
    
    // Check if the refresh token exists in the database
    const storedToken = await prisma.refreshToken.findFirst({
      where: {
        token: validatedData.refreshToken,
        userId: payload.userId,
        expiresAt: {
          gt: new Date(),
        },
      },
    });
    
    if (!storedToken) {
      return NextResponse.json(
        { error: 'Invalid or expired refresh token' },
        { status: 401 }
      );
    }
    
    // Generate a new access token
    const newAccessToken = signJwtAccessToken({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    });
    
    return NextResponse.json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Refresh token error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
