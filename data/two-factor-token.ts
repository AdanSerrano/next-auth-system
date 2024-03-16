import { db } from "@/lib/db";


export async function getTwoFactorTokenByToken(token: string) {
    try {
        const towFactorToken = await db.twoFactorToken.findUnique({
            where: {
                token
            }
        })

        return towFactorToken
    } catch (error) {
        return null
    }

}
export async function getTwoFactorTokenByEmail(email: string) {
    try {
        const towFactorToken = await db.twoFactorToken.findFirst({
            where: {
                email
            }
        })

        return towFactorToken
    } catch (error) {
        return null
    }
}