import { Button } from '@/components/ui/button';
import ErrorFeedback from '@/components/ui/error-feedback';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticationLayout from '@/layouts/AuthenticationLayout';
import { cn } from '@/lib/utils';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';

export default function Register({
    isRegisterEnabled,
}: {
    isRegisterEnabled: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    useEffect(() => {
        if (!isRegisterEnabled) {
            // redirect to login page
            window.location.href = route('login');
        }
    }, [isRegisterEnabled]);

    return (
        isRegisterEnabled && (
            <AuthenticationLayout>
                <Head title="Register" />

                <form className={cn('flex flex-col gap-6')} onSubmit={submit}>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-bold">
                            Register your account
                        </h1>
                        <p className="text-balance text-sm text-muted-foreground">
                            Enter your email below to register to your account
                        </p>
                    </div>
                    {errors.email && (
                        <div className="text-center text-sm text-red-600">
                            {errors.email}
                        </div>
                    )}
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                autoComplete="username"
                                placeholder="Enter your name"
                                required
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                autoFocus
                            />
                            <ErrorFeedback message={errors.name} />
                        </div>
                    </div>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                placeholder="you@example.com"
                                required
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                            />
                            <ErrorFeedback message={errors.email} />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
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
                            <ErrorFeedback message={errors.password} />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password_confirmation">
                                    Confirm Password
                                </Label>
                            </div>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                autoComplete="current-password"
                                placeholder="••••••••"
                                required
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                            />
                            <ErrorFeedback
                                message={errors.password_confirmation}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={processing}
                        >
                            Register
                        </Button>
                    </div>
                    <div className="flex justify-center gap-1 text-sm">
                        Already have an account?
                        <Link
                            href={route('login')}
                            className="underline underline-offset-4"
                        >
                            Log in
                        </Link>
                    </div>
                </form>
            </AuthenticationLayout>
        )
    );
}
