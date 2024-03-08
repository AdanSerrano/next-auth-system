'use server'
import { LoginSchema } from '@/schemas';
import * as z from 'zod';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const Login = async (values: z.infer<typeof LoginSchema>,
    callbackUrl?: string | null,) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: 'Error Fields' }
    }

    const { email, password } = validatedFields.data

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
        })
        return { success: 'Logged In' }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin": {
                    return { error: 'Invalid Credentials' };
                }
                case "CredentialsSignin":
                    throw error;
                default:
                    return { error: 'Something went wrong' }
            }
        }
        throw error;

    }
}
