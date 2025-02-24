import { Button } from '@/components/ui/button';
import AuthenticationLayout from '@/layouts/AuthenticationLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AuthenticationLayout>
            <Head title="Verify Email" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="flex flex-col items-center gap-4 text-center">
                    <h1 className="text-2xl font-bold">Verify your email</h1>
                    <p className="text-balance text-sm text-muted-foreground">
                        Please verify your email address by clicking the link in
                        the email we sent you. If you haven't received it, we
                        can send a new verification link.
                    </p>
                </div>

                {status === 'verification-link-sent' && (
                    <div className="text-center text-sm font-medium text-green-600 dark:text-green-400">
                        A new verification link has been sent to your email
                        address.
                    </div>
                )}

                <div className="grid gap-6">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                    >
                        Resend verification link
                    </Button>

                    <div className="text-center text-sm">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="underline underline-offset-4"
                        >
                            Log out
                        </Link>
                    </div>
                </div>
            </form>
        </AuthenticationLayout>
    );
}
