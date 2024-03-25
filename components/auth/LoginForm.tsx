'use client'
import * as z from 'zod';
import { useTransition } from 'react';
import Link from 'next/link';
import React, { useState } from "react";
import { LoginSchema } from '@/schemas';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation';


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
import { Login } from '@/actions/Login';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../ui/input-otp';


export default function LoginForm() {
    const searchParams = useSearchParams()
    const urlError = searchParams.get('error') === 'OAuthAccountNotLinked'
        ? 'Email already in use with different provider'
        : ''
    const [showToFactor, setShowToFactor] = useState(false)
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            Login(values).then((data) => {
                if (data?.error) {
                    form.reset()
                    setError(data.error)
                }
                if (data?.success) {
                    form.reset()
                    setSuccess(data.success)
                }

                if (data?.twoFactor) {
                    setShowToFactor(true)
                }
            })
                .catch(() => {
                    setError('Something went wrong')
                })
        })
    }

    return (
        <CardWrapper
            headerLabel='Welcome back'
            backButtonLabel='Don’t have an account? Sign up'
            backButtonHref='/auth/register'
            showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                >
                    <div className='space-y-4'>
                        {showToFactor && (
                            <FormField
                                control={form.control}
                                name='code'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Two Factor Code
                                        </FormLabel>
                                        <FormControl>
                                            <InputOTP
                                                {...field}
                                                maxLength={6}
                                                disabled={isPending}
                                            >
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                </InputOTPGroup>
                                                <InputOTPSeparator />
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        {!showToFactor && (
                            <>
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder='email.doe@example.com'
                                                    type='email'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder='*****'
                                                    type='password'
                                                />
                                            </FormControl>
                                            <Button
                                                size={'sm'}
                                                variant={'link'}
                                                asChild
                                                className='px-0 font-normal'
                                            >
                                                <Link href={'/auth/reset-password'}>
                                                    Forgot password?
                                                </Link>
                                            </Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button
                        type='submit'
                        className='w-full '
                        disabled={isPending}
                    >
                        {showToFactor ? 'Confirm' : 'Login'}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
