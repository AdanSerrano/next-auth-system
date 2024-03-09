'use server'
import { RegisterSchema } from '@/schemas';
import * as z from 'zod';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';
const bcrypt = require('bcryptjs');

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: 'Error Fields' }
    }

    const { email, name, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: 'Email already in use' }
    }

    await db.user.create({
        data: {
            email,
            name,
            password: hashedPassword

        }
    })

    // TODO: send verification email
    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    )


    return { success: 'Confirmationo email Sent!' }
}