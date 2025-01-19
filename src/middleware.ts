// // Protecting routes with next-auth
// // https://next-auth.js.org/configuration/nextjs#middleware
// // https://nextjs.org/docs/app/building-your-application/routing/middleware

// import NextAuth from 'next-auth';
// import authConfig from '@/lib/auth.config';

// const { auth } = NextAuth(authConfig);

// export default auth((req) => {
//   if (!req.auth) {
//     const url = req.url.replace(req.nextUrl.pathname, '/');
//     return Response.redirect(url);
//   }
// });

// export const config = { matcher: ['/dashboard/:path*'] };

import NextAuth from 'next-auth';
import authConfig from '@/lib/auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname, origin, href } = req.nextUrl;

  if (!isLoggedIn) {
    // For protected routes, redirect to login
    if (pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', href));
    }
  } else {
    // If logged in and trying to access login page, redirect to dashboard
    if (pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', href));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/dashboard/:path*', '/login']
};
