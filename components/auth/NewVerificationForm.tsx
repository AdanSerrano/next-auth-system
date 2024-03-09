'use client'
import { useCallback, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { newVerification } from '@/actions/NewVerificationToken'
import CardWrapper from "@/components/auth/CardWrapper"
import { FormError } from '@/components/FormError'
import { FormSuccess } from '@/components/FormSuccess'


export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError("Token not found")
            return
        };

        newVerification(token)
            .then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
            .catch(() => {
                setError("Something went wrong")
            })
    }, [token, success, error])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <CardWrapper
            headerLabel="Confirm your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <BeatLoader color="#000" />
                )}
                <FormSuccess message={success} />
                {!success && (
                    <>
                        <div className='flex text-xs flex-col gap-y-2 items-center text-green-600'>
                            <FormError message={error} />
                            Token verification successful
                        </div>
                    </>
                )}
            </div>


        </CardWrapper>
    )
}
