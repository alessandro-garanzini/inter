import { NextResponse } from 'next/server';

export function middleware(req) {
  const cookies = req.cookies;
  const authToken = cookies.get("auth_token");  

  const isLoginPage = req.nextUrl.pathname === '/login';

  if (!authToken && req.nextUrl.pathname.startsWith('/') && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (authToken && (req.nextUrl.pathname == '/' || isLoginPage )) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}