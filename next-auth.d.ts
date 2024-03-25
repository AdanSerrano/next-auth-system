import authConfig from '@/auth.config'
import { UserRole } from '@prisma/client'
import NextAuth, { DefaultSession } from "next-auth"


declare module "next-auth" {
    interface User {
        id: string;
        role: UserRole
        isTwoFactorEnabled: boolean
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: UserRole
    }
}
