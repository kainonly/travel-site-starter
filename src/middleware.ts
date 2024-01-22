import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('session')?.value;
  if (!currentUser) {
    console.log(request.url);
    // return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['!/login', '/((?!api|_next/static|_next/image|favicon.ico).*)']
};
