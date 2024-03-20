import React from 'react'
import { Navbar } from '@/app/(protected)/_components/navbar'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-full h-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
            <Navbar />
            {children}
        </div>
    )
}
