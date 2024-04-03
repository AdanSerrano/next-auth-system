import NextAuth from "next-auth"
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import type { Adapter } from '@auth/core/adapters';
import { getAccountByUserId } from "./data/Account";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
    // update,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
        verifyRequest: "/auth/verification"
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            // console.log({
            //     user,
            // })

            // console.log({ user, account })

            if (account?.provider !== 'credentials') return true;

            const existingUser = await getUserById(user.id)
            // prevent login if email is not verified
            if (!existingUser?.emailVerified) return false;

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
                if (!twoFactorConfirmation) return false;

                // delete two factor confirmation
                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id }
                });
            }


            // TODO : Add two factor authentication

            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
            }

            if (session.user) {
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.isOAuth = token.isOAuth as boolean;
            }


            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            const existingAccount = await getAccountByUserId(existingUser.id)

            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

            return token;
        }
    },
    adapter: PrismaAdapter(db) as Adapter,
    session: { strategy: "jwt" },
    ...authConfig,
});