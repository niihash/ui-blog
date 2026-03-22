import { NextResponse } from "next/server";

const protectedRoutes = ["/me"]
export function proxy(request) {
    const token = request.cookies.get("laravel-session");
    console.log(token)
    const pathname = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/", request.url));
    } return NextResponse.next();
}

export const config = {
    matcher: '/:path*'
}
