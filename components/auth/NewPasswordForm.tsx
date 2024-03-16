'use client'
import * as z from 'zod';
import { useTransition } from 'react';
import React, { useState } from "react";
import { NewPasswordSchema } from '@/schemas';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'


import CardWrapper from '@/components/auth/CardWrapper';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { useSearchParams } from 'next/navigation';
import { NewPassword } from '@/actions/new-password';


export default function NewPasswordForm() {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: '',
        }
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            NewPassword(values, token).then((data) => {
                setError(data?.error),
                    setSuccess(data?.success)
            })
        })
    }

    return (
        <CardWrapper
            headerLabel='Enter a new password'
            backButtonLabel='Back to login'
            backButtonHref='/auth/login'
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                >
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='password'
                            disabled={isPending}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='******'
                                            type='password'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        type='submit'
                        className='w-full '
                        disabled={isPending}
                    >
                        Reset password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
