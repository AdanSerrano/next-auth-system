'use client'
import * as z from 'zod';
import { useTransition } from 'react';
import React, { useState } from "react";
import { ResetPasswordSchema } from '@/schemas';
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
import { Reset } from '@/actions/Reset';


export default function ResetPasswordForm() {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: '',
        }
    })

    const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            Reset(values).then((data) => {
                setError(data?.error),
                    setSuccess(data?.success)
            })
        })
    }

    return (
        <CardWrapper
            headerLabel='Forgot your password?'
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
                            name='email'
                            disabled={isPending}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='email.doe@example.com'
                                            type='email'
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
                        Send Reset Email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
