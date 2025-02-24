import { Button } from '@/components/ui/button';
import AuthenticationLayout from '@/layouts/AuthenticationLayout';
import { Head, Link } from '@inertiajs/react';
import { MailOpen } from 'lucide-react';

export default function PasswordResetSent() {
    return (
        <AuthenticationLayout>
            <Head title="Password Reset Link Sent" />

            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="rounded-full bg-muted p-3">
                        <MailOpen className="size-6" />
                    </div>
                    <h1 className="text-2xl font-bold">Check your email</h1>
                    <p className="text-balance text-sm text-muted-foreground">
                        We have sent a password reset link to your email
                        address. Please check your inbox and follow the
                        instructions to reset your password.
                    </p>
                </div>

                <div className="grid gap-4">
                    <Button asChild variant="outline" className="w-full">
                        <Link href={route('login')}>Return to login</Link>
                    </Button>

                    <div className="text-center text-sm">
                        Didn't receive the email?{' '}
                        <Link
                            href={route('auth.forgot-password')}
                            className="underline underline-offset-4"
                        >
                            Try again
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticationLayout>
    );
}
