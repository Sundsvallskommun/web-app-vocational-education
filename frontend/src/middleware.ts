import { apiURL } from '@utils/api-url';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const protectedRoutes = JSON.parse(process.env.NEXT_PUBLIC_PROTECTED_ROUTES as string);

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/admin') {
    return NextResponse.redirect(new URL(process.env.ADMIN_URL as string));
  }
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    const cookieName = 'connect.sid';
    const token = req.cookies.get(cookieName)?.value || '';

    const res = await fetch(apiURL('/me'), {
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cookie: `${cookieName}=${encodeURI(token)}`,
      },
    });
    if (res.status === 401) {
      const absoluteURL = new URL(`${process.env.BASE_PATH}/login?path=${req.nextUrl.pathname}`, req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    } else {
      NextResponse.next();
    }
  }
}
