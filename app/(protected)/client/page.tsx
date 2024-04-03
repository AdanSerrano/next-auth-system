import { UserInfo } from '@/components/userInfo'
import { currentUser } from '@/lib/auth'
import React from 'react'

export default async function ClientPage() {
    const user = await currentUser()
    return (
        <UserInfo user={user} label='📱 Client Component' />
    )
}
