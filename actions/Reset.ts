'use server'
import * as z from 'zod'


import { ResetPasswordSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/tokens'


export const Reset = async (values: z.infer<typeof ResetPasswordSchema>) => {
    const validatedFields = ResetPasswordSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: 'Error Fields' }
    }

    const { email } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email) {
        return { error: 'Email does not exist' }
    }

    const passwordResetToken = await generatePasswordResetToken(existingUser.email)
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    )

    return { success: 'Email sent' }
}   