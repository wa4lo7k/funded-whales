import { NextRequest, NextResponse } from 'next/server';
import { JwtPayload, verifyJwt } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

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
    
    // Check if the user has a MyFXBook account
    const myfxbookAccount = await prisma.myfxbookAccount.findFirst({
      where: {
        userId: payload.userId,
      },
    });
    
    if (!myfxbookAccount) {
      return NextResponse.json(
        { error: 'MyFXBook account not found' },
        { status: 404 }
      );
    }
    
    // In a real implementation, you would sync with MyFXBook API
    // For now, we'll just update the lastSync timestamp
    await prisma.myfxbookAccount.update({
      where: {
        id: myfxbookAccount.id,
      },
      data: {
        lastSync: new Date(),
      },
    });
    
    return NextResponse.json({
      success: true,
      message: "MyFXBook account synced successfully",
    });
  } catch (error) {
    console.error('Error syncing MyFXBook account:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
