import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from '@/routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;


    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)


    if (isApiAuthRoute) {
        return undefined;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            const redirectUrl = new URL(DEFAULT_LOGIN_REDIRECT, nextUrl);
            return Response.redirect(redirectUrl);
        }
        return undefined;
    }

    if (!isLoggedIn && !isPublicRoute) {
        const redirectUrl = new URL("/auth/login", nextUrl);
        return Response.redirect(redirectUrl)
    }

    return undefined;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}