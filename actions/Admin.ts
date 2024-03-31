'use server'

import { currentRole } from "@/lib/auth"
import { UserRole } from "@prisma/client"
import { error } from "console"

export const Admin = async () => {
    const role = await currentRole()

    if (role === UserRole.ADMIN) {
        return { success: "Allowed Server action" }
    }

    return { error: "FORBIDDEN Server action!" }
}