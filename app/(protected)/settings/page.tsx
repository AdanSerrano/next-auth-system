'use client'

import { logout } from "@/actions/logout"
import { UserInfo } from "@/components/userInfo"
import { useCurrentUser } from "@/hooks/use-current-user"

export default function SettingsPage() {
    const user = useCurrentUser()

    return (
        <>
            {/* <UserInfo user={user} label="Settings page" /> */}

        </>
    )
}
