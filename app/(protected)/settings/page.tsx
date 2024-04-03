'use client'
import * as z from 'zod'
import { useTransition } from 'react'
import { useSession } from 'next-auth/react'
import {
    Card,
    CardContent,
    CardHeader
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings } from '@/actions/Settings'
import { Input } from '@/components/ui/input'
import { useCurrentUser } from '@/hooks/use-current-user'
import { currentUser } from '@/lib/auth'

export default function SettingsPage() {
    const { update } = useSession()

    const [isPending, startTransition] = useTransition()

    const onClick = () => {
        startTransition(() => {
            Settings({
                name: "asdfasfsdf",
            })
        })
    }

    return (
        <Card className='w-[600px]'>
            <CardHeader>
                <p className='text-2xl font-medium text-center'>
                    ⚙️ Settings
                </p>
            </CardHeader>
            <CardContent>
                <Button disabled={isPending} onClick={onClick}>
                    Update Name
                </Button>
            </CardContent>
        </Card>
    )
}
