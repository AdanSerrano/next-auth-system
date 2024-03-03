'use server'
import { LoginSchemas } from '@/schemas';
import * as z from 'zod';

export const Login = async (values: z.infer<typeof LoginSchemas>) => {
    const validatedFields = LoginSchemas.safeParse(values)

    if (!validatedFields.success) {
        return { error: 'Error Fields' }
    }

    return { success: 'Email Sent!' }
}