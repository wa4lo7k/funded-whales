import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePasswords } from '@/lib/password';
import { loginSchema } from '@/lib/validations/auth';
import { ZodError } from 'zod';
import { getJwtExpiration, signJwtAccessToken, signJwtRefreshToken } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = loginSchema.parse(body);
    
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Verify password
    const isPasswordValid = await comparePasswords(
      validatedData.password,
      user.password
    );
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Generate JWT tokens
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    
    const accessToken = signJwtAccessToken(payload);
    const refreshToken = signJwtRefreshToken(payload);
    
    // Store refresh token in database
    const refreshTokenExpiresAt = getJwtExpiration(
      process.env.REFRESH_TOKEN_EXPIRES_IN || '7d'
    );
    
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: refreshTokenExpiresAt,
      },
    });
    
    // Create a session
    const sessionExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days
    await prisma.session.create({
      data: {
        userId: user.id,
        expiresAt: sessionExpiresAt,
      },
    });
    
    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
