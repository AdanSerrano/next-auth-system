'use server'
import { getPasswordResetToken } from '@/data/password-reset-token'
import { getUserByEmail } from '@/data/user'
import { db } from '@/lib/db'
import { NewPasswordSchema } from '@/schemas'
import * as z from 'zod'

const bcrypt = require('bcryptjs');

export const NewPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null
) => {

    if (!token) {
        return { error: 'Missing token' }
    }

    const validatedField = NewPasswordSchema.safeParse(values)

    if (!validatedField.success) {
        return { error: 'Invalid input' }
    }

    const { password } = validatedField.data
    const existingToken = await getPasswordResetToken(token)

    if (!existingToken) {
        return { error: 'Invalid token' }
    }

    const hasExpired = await new Date(existingToken.expires) < new Date()

    if (hasExpired) {
        return {
            error: 'Token has expired '
        }
    }


    const existingUser = await getUserByEmail(existingToken.email)

    if (!existingUser) {
        return { error: 'User not found' }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.user.update({
        where: {
            email: existingToken.email
        },
        data: {
            password: hashedPassword
        }
    })

    await db.passwordResetToken.delete({
        where: {
            id: existingToken.id
        }
    })

    return { success: 'Password updated successfully' }
}