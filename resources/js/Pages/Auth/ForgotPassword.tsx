import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticationLayout from '@/layouts/AuthenticationLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'), {
            onSuccess: () => router.visit(route('forgot-password.sent')),
        });
    };

    return (
        <AuthenticationLayout>
            <Head title="Forgot Password" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="flex flex-col items-center gap-4 text-center">
                    <h1 className="text-2xl font-bold">
                        Forgot your password?
                    </h1>
                    <p className="text-balance text-sm text-muted-foreground">
                        No problem. Let us know your email address and we will
                        email you a password reset link.
                    </p>
                </div>

                {status && (
                    <div className="text-center text-sm font-medium text-green-600 dark:text-green-400">
                        {status}
                    </div>
                )}

                {errors.email && (
                    <div className="text-center text-sm text-red-600">
                        {errors.email}
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
                            placeholder="m@example.com"
                            required
                            onChange={(e) => setData('email', e.target.value)}
                            autoFocus
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                    >
                        Send
                    </Button>

                    <div className="text-center text-sm">
                        Did you remember?{' '}
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
