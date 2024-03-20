'use server'

import { signOut } from "@/auth"
import React from 'react'

export const logout = async () => {
    await signOut()
}
