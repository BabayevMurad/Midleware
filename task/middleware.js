import { NextResponse } from 'next/server';

export function middleware(request) {
  const access = request.cookies.get('access');
  if (request.nextUrl.pathname === '/upload') {
    if (!access || access.value !== 'true') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/upload'],
};
