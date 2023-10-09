
//  // middleware.ts 
import * as jose from 'jose';
import * as cookie from 'cookie'
import jwt from 'jsonwebtoken';

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';

interface Session {
  name: string;
  email: string;
  user: {
    _id: string;
    email: string;
    role: string;
    name: string;
  };
  iat: number;
  exp: number;
  jti: string;
}

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const requestPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();

    // // Roles admitidos
    const validRoles = ['admin'];

    // // informacion util del usuario
    // console.log( session )

    //Si no hay una sesion hayq que mostrar el login
    if( !session ){

      url.pathname = '/auth/login'
      url.search = `p=${ requestPage }`

      return NextResponse.redirect( url );
    }


    if (session?.user) {
      const { role } = session.user as { role: string };
      
      if( requestPage.includes('/api/admin') && !validRoles.includes( role ) ){
        return NextResponse.redirect(new URL('/', req.url));
      }

      
      if( requestPage.includes('/admin') && !validRoles.includes( role ) ){
        return NextResponse.redirect(new URL('/', req.url));
      }

      
    }else {
      url.pathname = '/auth/login'
      url.search = `p=${ requestPage }`

      return NextResponse.redirect( url );
    }


    return NextResponse.next();

    
    // const token = req.cookies.get('token') || '';
    // const requestPage = req.nextUrl.pathname;
   
    // if (!token) {
    //   const url = req.nextUrl.clone();
    //   url.pathname = `/auth/login`;
    //   url.search = `p=${ requestPage }`;

    //   return NextResponse.redirect( url );
    // }
    // const validRoles = ['admin'];
    // let role = ''

    // try {
    //   await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));
      
    //   const decoded = jwt.decode(token) as { role: string };
    //   role = decoded.role;

    //   // if( requestPage.includes('/api/admin') && !validRoles.includes( role ) ){
        
    //   //   return NextResponse.redirect(new URL('/', req.url));
      
    //   // }

    //   if( requestPage.includes('/api/admin') && !validRoles.includes( role ) ){
    //     // return new Response( JSON.stringify({ message: 'No autorizado' }),{
    //     //   status: 401,
    //     //   headers:{
    //     //     'Content-Type':'application/json'
    //     //   }
    //     // });
    //     return NextResponse.redirect(new URL('/', req.url));
    //   }
      
    //   if( requestPage.includes('/admin') && !validRoles.includes( role ) ){
    //     return NextResponse.redirect(new URL('/', req.url));
    //   }

    //   return NextResponse.next();
      
    // } catch (error) {
    //   const url = req.nextUrl.clone();
    //   url.pathname = `/auth/login`;
    //   url.search = `p=${ requestPage }`;

    //   return NextResponse.redirect( url );
      
    // }



//   return NextResponse.redirect(new URL('/about-2', req.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/checkout/address', '/checkout/summary', '/admin/:path*', '/((?!api\/)/admin/:path.*)'],
}