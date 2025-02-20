'use client'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SettingsSchema } from '@/schemas'
import { useState, useTransition } from 'react'
import { useSession } from 'next-auth/react'
import {
    Card,
    CardContent,
    CardHeader
} from '@/components/ui/card'
import {
    Form,
    FormField,
    FormControl,
    FormMessage,
    FormItem,
    FormLabel,
    FormDescription,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Settings } from '@/actions/Settings'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { useCurrentUser } from '@/hooks/use-current-user'
import { FormSuccess } from '@/components/FormSuccess'
import { FormError } from '@/components/FormError'
import { UserRole } from '@prisma/client'
import { Switch } from '@/components/ui/switch'

export default function SettingsPage() {
    const user = useCurrentUser()
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const { update } = useSession()

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || undefined,
            password: undefined,
            newPassword: undefined,
            email: user?.email || undefined,
            role: user?.role || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
        }
    })

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            Settings(values)
                .then((data) => {
                    if (data.error) {
                        setError(data.error)
                    }
                    if (data.success) {
                        setSuccess(data.success)
                        update()
                    }
                })
                .catch(() => {
                    setError('Something went wrong')
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
                <Form {...form}>
                    <form
                        className='space-y-6'
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='Jhon Doe'
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {user?.isOAuth === false && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder='jhon.doe@example.com'
                                                        type='email'
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder='******'
                                                        type='password'
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}

                                    />
                                    <FormField
                                        control={form.control}
                                        name='newPassword'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    NewPassword
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder='******'
                                                        type='password'
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                            <FormField
                                control={form.control}
                                name='role'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Role
                                        </FormLabel>
                                        <Select
                                            disabled={isPending}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Select a role' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={UserRole.ADMIN}>
                                                    ADMIN
                                                </SelectItem>
                                                <SelectItem value={UserRole.USER}>
                                                    USER
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            {user?.isOAuth === false && (
                                <FormField
                                    control={form.control}
                                    name='isTwoFactorEnabled'
                                    render={({ field }) => (
                                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                                            <div className='space-y-0.5'>
                                                <FormLabel>
                                                    Two Factor Authentication
                                                </FormLabel>
                                                <FormDescription>
                                                    Enabled two factor authentication
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    disabled={isPending}
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>
                        <FormSuccess message={success} />
                        <FormError message={error} />
                        <Button type='submit'>
                            save
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
