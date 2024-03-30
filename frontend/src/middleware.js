// pages/_middleware.ts
import { NextResponse } from 'next/server';

export function middleware(req) {
  const cookies = req.cookies;
  const authToken = cookies.get("auth_token");  

  // Evita il reindirizzamento se l'utente è già sulla pagina di login
  const isLoginPage = req.nextUrl.pathname === '/login';

  console.log(`Pathname: ${req.nextUrl.pathname}, Method: ${req.method}`);


  // Logica per controllare se l'utente è autorizzato
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