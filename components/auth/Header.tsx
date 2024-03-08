'use client'
import React from "react"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['600']
})


interface HeaderProps {
    label: string
}
export default function Header({ label }: HeaderProps) {
    return (
        <div className={cn(
            'w-full flex flex-col items-center justify-center gap-y-4',
            poppins.className
        )}>
            <h1 className="">
                🔐 Auth
            </h1>
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
        </div>
    )
}
