import NextAuth from 'next-auth';
import { NextRequest, NextResponse } from 'next/server'
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher 用來指定 middleware 要在哪些 path 才執行
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
 
// export function middleware(request: NextRequest) {
// const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
//   // 定義 CSP 內容
//   const cspHeader = `
//     default-src 'self';
//     script-src 'self' 'nonce-${nonce}';
//     style-src 'self' 'nonce-${nonce}';
//     img-src 'self' blob: data:;
//     font-src 'self';
//     object-src 'none';
//     base-uri 'self';
//     form-action 'self';
//     frame-ancestors 'none';
//     upgrade-insecure-requests;
// `
//   // 上面的寫法是為了維護時的易讀性，透過此行將多餘的換行及空白移除以確保 CSP 格式的正確性
//   const contentSecurityPolicyHeaderValue = cspHeader
//     .replace(/\s{2,}/g, ' ')
//     .trim()
 
//   const requestHeaders = new Headers(request.headers)
//   requestHeaders.set('x-nonce', nonce)
 
//   requestHeaders.set(
//     'Content-Security-Policy',
//     contentSecurityPolicyHeaderValue
//   )
 
//   const response = NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   })
// //   const response = NextResponse.next();

//   response.headers.set(
//     'Content-Security-Policy',
//     contentSecurityPolicyHeaderValue
//   )
 
//   return response
// }

// export const config = {
//     matcher: [
//       /*
//        * Match all request paths except for the ones starting with:
//        * - api (API routes)
//        * - _next/static (static files)
//        * - _next/image (image optimization files)
//        * - favicon.ico (favicon file)
//        */
//       {
//         source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
//         missing: [
//           { type: "header", key: "next-router-prefetch" },
//           { type: "header", key: "purpose", value: "prefetch" },
//         ],
//       },
//     ],
//   };