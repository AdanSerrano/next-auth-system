import { auth, signOut } from "@/auth"

export default async function SettingsPage() {
    const session = await auth();
    console.log(session?.user?.role)
    return (
        <div>
            {JSON.stringify(session)}

            <form action={async () => {
                "use server"

                await signOut();
            }}>
                <button type="submit">
                    sign out
                </button>
            </form>
        </div>
    )
}
