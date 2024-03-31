'use client'
import { Admin } from "@/actions/Admin";
import { RoleGate } from "@/components/auth/RoleGate";
import { FormSuccess } from "@/components/FormSuccess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

export default function AdminPage() {
    const onServerActionClick = () => {
        Admin()
            .then((data) => {
                if (data.success) {
                    toast.success(data.success)
                } else {
                    toast.error(data.error)
                }
            })
    }

    const onApiRouteClick = async () => {
        fetch("/api/admin")
            .then((response) => {
                if (response.ok) {
                    toast.success("API Route is accessible")
                } else {
                    toast.error("FORBIDDEN API Route")
                }
            })
    }
    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    🔑 Admin
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You are allowed to see this content" />
                </RoleGate>
                <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Admin-only API Route
                    </p>
                    <Button onClick={onApiRouteClick}>
                        Click to test
                    </Button>
                </div>


                <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-md ">
                    <p className="text-sm font-medium">
                        Admin-only Server Action
                    </p>
                    <Button onClick={onServerActionClick}>
                        Click to test
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
