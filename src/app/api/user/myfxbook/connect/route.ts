import { NextRequest, NextResponse } from 'next/server';
import { JwtPayload, verifyJwt } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for MyFXBook connection
const connectSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  accountId: z.string().min(1),
});

export async function POST(req: NextRequest) {
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
    
    // Parse and validate request body
    const body = await req.json();
    const validatedData = connectSchema.parse(body);
    
    // In a real implementation, you would authenticate with MyFXBook API
    // For now, we'll simulate a successful connection
    
    // Check if the user already has a MyFXBook account
    const existingAccount = await prisma.myfxbookAccount.findFirst({
      where: {
        userId: payload.userId,
      },
    });
    
    if (existingAccount) {
      // Update existing account
      await prisma.myfxbookAccount.update({
        where: {
          id: existingAccount.id,
        },
        data: {
          accountId: validatedData.accountId,
          name: "Trading Account",
          connected: true,
          lastSync: new Date(),
        },
      });
    } else {
      // Create new account
      await prisma.myfxbookAccount.create({
        data: {
          accountId: validatedData.accountId,
          name: "Trading Account",
          connected: true,
          lastSync: new Date(),
          userId: payload.userId,
        },
      });
    }
    
    return NextResponse.json({
      success: true,
      message: "MyFXBook account connected successfully",
    });
  } catch (error) {
    console.error('Error connecting MyFXBook account:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
