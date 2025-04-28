import jwt from 'jsonwebtoken';
import { UserRole } from '@prisma/client';

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export function signJwtAccessToken(payload: JwtPayload) {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '15m';
  
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  
  return jwt.sign(payload, secret, { expiresIn });
}

export function signJwtRefreshToken(payload: JwtPayload) {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';
  
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyJwt<T>(token: string): T | null {
  try {
    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    
    return jwt.verify(token, secret) as T;
  } catch (error) {
    return null;
  }
}

export function getJwtExpiration(expiresIn: string): Date {
  const units: Record<string, number> = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 24 * 60 * 60,
  };
  
  const match = expiresIn.match(/^(\d+)([smhd])$/);
  
  if (!match) {
    throw new Error(`Invalid expiration format: ${expiresIn}`);
  }
  
  const [, value, unit] = match;
  const seconds = parseInt(value) * (units[unit] || 1);
  
  return new Date(Date.now() + seconds * 1000);
}
