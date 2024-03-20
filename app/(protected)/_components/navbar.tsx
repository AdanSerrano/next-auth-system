"use client"
import { UserBotton } from "@/components/auth/UserBotton"
import { Button } from "@/components/ui/button"
import { navbar } from "@/data/Navbar"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Navbar = () => {

    const pathname = usePathname()

    return (
        <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
            <div className="flex gap-x-2">
                {navbar.map((items, index) => {
                    return (
                        <Button
                            key={index}
                            variant={pathname === items.href ? 'default' : 'outline'}
                            asChild>
                            <Link href={items.href}>
                                {items.name}
                            </Link>
                        </Button>
                    )
                })}
            </div>
            <UserBotton />
        </nav>
    )
}