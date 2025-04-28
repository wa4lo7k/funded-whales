import { NextRequest, NextResponse } from 'next/server';
import { JwtPayload, verifyJwt } from './lib/jwt';

// Define protected routes and their required roles
const protectedRoutes = [
  {
    path: '/dashboard',
    roles: ['USER', 'ADMIN'],
  },
  {
    path: '/admin',
    roles: ['ADMIN'],
  },
  {
    path: '/profile',
    roles: ['USER', 'ADMIN'],
  },
];

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/refresh',
  '/api/auth/logout',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check if it's an API route
  if (pathname.startsWith('/api/')) {
    // For API routes, check the Authorization header
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyJwt<JwtPayload>(token);

    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check role-based access for API routes
    const protectedRoute = protectedRoutes.find(route =>
      pathname.startsWith(`/api${route.path}`)
    );

    if (protectedRoute && !protectedRoute.roles.includes(payload.role)) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    return NextResponse.next();
  }

  // For page routes, check the cookie
  const token = request.cookies.get('accessToken')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const payload = verifyJwt<JwtPayload>(token);

  if (!payload) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Check role-based access for page routes
  const protectedRoute = protectedRoutes.find(route =>
    pathname.startsWith(route.path)
  );

  if (protectedRoute && !protectedRoute.roles.includes(payload.role)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
