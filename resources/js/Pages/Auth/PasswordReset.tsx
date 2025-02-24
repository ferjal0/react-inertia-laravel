import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticationLayout from '@/layouts/AuthenticationLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function PasswordReset({ token }: { token: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: new URLSearchParams(window.location.search).get('email') || '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.update'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthenticationLayout>
            <Head title="Reset Password" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="flex flex-col items-center gap-4 text-center">
                    <h1 className="text-2xl font-bold">Reset your password</h1>
                    <p className="text-balance text-sm text-muted-foreground">
                        Please enter your new password below to reset your
                        account password.
                    </p>
                </div>

                {errors.token && (
                    <div className="text-center text-sm text-red-600">
                        {errors.token}
                    </div>
                )}

                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full"
                            autoComplete="username"
                            required
                            disabled
                        />
                        {errors.email && (
                            <div className="text-sm text-red-600">
                                {errors.email}
                            </div>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">New Password</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full"
                            autoComplete="new-password"
                            required
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />
                        {errors.password && (
                            <div className="text-sm text-red-600">
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">
                            Confirm New Password
                        </Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="block w-full"
                            autoComplete="new-password"
                            required
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                        />
                        {errors.password_confirmation && (
                            <div className="text-sm text-red-600">
                                {errors.password_confirmation}
                            </div>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                    >
                        Reset Password
                    </Button>

                    <div className="text-center text-sm">
                        Remember your password?{' '}
                        <Link
                            href={route('login')}
                            className="underline underline-offset-4"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </form>
        </AuthenticationLayout>
    );
}
