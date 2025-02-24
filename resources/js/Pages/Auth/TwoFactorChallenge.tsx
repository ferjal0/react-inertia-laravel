import ErrorFeedback from '@/components/ui/error-feedback';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import AuthenticationLayout from '@/layouts/AuthenticationLayout';
import { Head, useForm } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';

export default function TwoFactorChallenge() {
    const { data, setData, post, errors } = useForm({
        code: '',
    });

    const handleSubmit = async () => {
        if (data.code.length !== 6) return;

        post(route('two-factor.login.store'));
    };

    return (
        <AuthenticationLayout>
            <Head title="Login" />
            <div className="flex flex-col items-center gap-6 text-center">
                <div className="flex flex-col items-center gap-4">
                    <ShieldCheck className="size-12" />
                    <h1 className="text-2xl font-bold">
                        Two-Factor Authentication
                    </h1>
                </div>

                <InputOTP
                    value={data.code}
                    maxLength={6}
                    onChange={(value) => setData('code', value)}
                    onComplete={handleSubmit}
                    autoFocus
                >
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>

                <p className="text-balance text-sm text-muted-foreground">
                    Please enter the one-time password from your authenticator
                    app.
                </p>

                {errors && <ErrorFeedback message={errors.code} />}
            </div>
        </AuthenticationLayout>
    );
}
