import { verifySync } from '@node-rs/jsonwebtoken';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const logout = NextResponse.redirect(new URL('/login', request.url));
  if (!token) {
    return logout;
  }

  try {
    const claims = verifySync(token, process.env.KEY as string);
    console.log(claims);
  } catch {
    return logout;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|favicon.ico|login).*)']
};
