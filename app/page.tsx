import React from "react";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/LoginButton";


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function Home() {

  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1 className={cn(
          "text-6xl font-semibold text-white drop-shadow-md",
          poppins.className,

        )}>
          🔐 Auth
        </h1>
        <p className={"text-white text-lg"}>
          A simple authentication service
        </p>
        <LoginButton>
          <Button variant={'secondary'} size={'lg'}>
            Sign In
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
