import { Button } from '@/components/ui/button';
import ErrorFeedback from '@/components/ui/error-feedback';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticationLayout from '@/layouts/AuthenticationLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    isRegisterEnabled,
}: {
    isRegisterEnabled: boolean;
}) {
    const { data, setData, post, processing, reset, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthenticationLayout>
            <Head title="Login" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">
                        Login to your account
                    </h1>
                    <p className="text-balance text-sm text-muted-foreground">
                        Enter your email below to login to your account
                    </p>
                </div>
                <ErrorFeedback message={errors.email} />
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            placeholder="m@example.com"
                            required
                            onChange={(e) => setData('email', e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="current-password"
                            placeholder="••••••••"
                            required
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                    >
                        Login
                    </Button>
                    <div className="text-center text-sm">
                        <Link
                            href={route('auth.forgot-password')}
                            className="underline underline-offset-4"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                </div>
                {isRegisterEnabled && (
                    <div className="flex justify-center gap-1 text-sm">
                        Don't have an account?
                        <Link
                            href={route('register')}
                            className="underline underline-offset-4"
                        >
                            Sign up
                        </Link>
                    </div>
                )}
            </form>
        </AuthenticationLayout>
    );
}
