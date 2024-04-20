'use client'
import { UserInfo } from '@/components/userInfo'

import { useCurrentUser } from '@/hooks/use-current-user'
import { currentUser } from '@/lib/auth'
import React from 'react'

export default function ClientPage() {
    const user = useCurrentUser()
    return (
        <UserInfo user={user} label='📱 Client Component' />
    )
}
