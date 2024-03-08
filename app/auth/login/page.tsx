'use client'
import LoginForm from '@/components/auth/LoginForm'
import React, { Suspense } from 'react'


function SearchBarFallback() {
    return <>placeholder</>
}

export default function LoginPage() {
    return (
        <Suspense fallback={<SearchBarFallback />}>
            <LoginForm />
        </Suspense>
    )
}
