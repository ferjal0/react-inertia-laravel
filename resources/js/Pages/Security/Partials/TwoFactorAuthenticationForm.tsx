import ConfirmWithPassword from '@/components/confirm-with-password';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { PageProps } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { CheckCircle, LoaderCircle, ScanQrCode, Siren } from 'lucide-react';
import { FormEvent, useRef, useState } from 'react';
import { toast } from 'sonner';

export function TwoFactorAuthenticationForm() {
    // State
    const [enabling, setEnabling] = useState(false);
    const [disabling, setDisabling] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);

    // Refs
    const inputRef = useRef<HTMLInputElement>(null);

    // Hooks
    const form = useForm({
        code: '',
    });

    const { auth } = usePage<PageProps>().props;
    const user = auth.user;
    const twoFactorEnabled = user.two_factor_confirmed_at !== null;

    // Functions
    const enableTwoFactorAuthentication = async () => {
        setEnabling(true);

        router.post(
            route('two-factor.enable'),
            {},
            {
                onSuccess: () => {
                    setEnabling(false);
                    showQrCode();
                },
            },
        );
    };

    const showQrCode = () => {
        axios
            .get(route('two-factor.qr-code'))
            .then((response) => {
                setQrCode(response.data.svg);
            })
            .then(() => {
                toast.success('2FA QR Code generated');
            });
    };

    const confirmTwoFactorAuthentication = async (e: FormEvent) => {
        e.preventDefault();

        setConfirming(true);

        form.post(route('two-factor.confirm'), {
            errorBag: 'confirmTwoFactorAuthentication',
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setConfirming(false);
                setQrCode(null);
                showRecoveryCodes();
                toast.success('2FA successfully enabled');
            },
            onError: () => {
                setConfirming(false);
                inputRef.current?.focus();
                form.errors.code
                    ? toast.error(form.errors.code)
                    : toast.error('Something went wrong');
            },
        });
    };

    const showRecoveryCodes = () => {
        axios.get(route('two-factor.recovery-codes')).then((response) => {
            setRecoveryCodes(response.data);
        });
    };

    const disableTwoFactorAuthentication = () => {
        setDisabling(true);

        form.delete(route('two-factor.disable'), {
            preserveScroll: true,
            preserveState: true,
            onBefore: () => {
                setDisabling(true);
            },
            onSuccess: () => {
                setDisabling(false);
            },
            onError: () => {
                setDisabling(false);
            },
            onFinish: () => {
                setDisabling(false);
            },
        });
    };

    // Effects

    return (
        <section className={'flex max-w-xl flex-col gap-10'}>
            <header className="flex flex-col gap-2">
                <h2 className="text-lg font-medium">2FA</h2>

                <p className="text-muted-foreground text-sm">
                    Add additional security to your account using two factor
                    authentication.
                </p>
            </header>

            {qrCode && (
                <>
                    <div className="flex flex-col gap-10">
                        <Alert>
                            <ScanQrCode className="h-4 w-4" />
                            <AlertTitle>Almost there</AlertTitle>
                            <AlertDescription>
                                To finish enabling two factor authentication,
                                scan the following QR code using your phone's
                                authenticator application or enter the setup key
                                and provide the generated OTP code.
                            </AlertDescription>
                        </Alert>

                        <div className="flex flex-col items-center gap-10 md:flex-row">
                            <div
                                className="contrast-200"
                                dangerouslySetInnerHTML={{ __html: qrCode }}
                            ></div>
                            <form
                                onSubmit={confirmTwoFactorAuthentication}
                                className="flex flex-col gap-2"
                            >
                                <Label htmlFor="code">Code</Label>

                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <InputOTP
                                            ref={inputRef}
                                            value={form.data.code}
                                            maxLength={6}
                                            minLength={6}
                                            onChange={(value) =>
                                                form.setData('code', value)
                                            }
                                            autoFocus
                                            required
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

                                        <Button
                                            type="submit"
                                            disabled={
                                                form.processing || confirming
                                            }
                                        >
                                            {form.processing || confirming ? (
                                                <span className="flex items-center gap-2">
                                                    <LoaderCircle className="size-4 animate-spin" />
                                                    Confirming...
                                                </span>
                                            ) : (
                                                'Confirm'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}

            {!twoFactorEnabled && !qrCode && (
                <div className="flex flex-col gap-10">
                    <div className="flex items-center gap-4 text-sm">
                        <Alert>
                            <Siren className="h-4 w-4" />
                            <AlertTitle>Important</AlertTitle>
                            <AlertDescription>
                                Two-factor authentication is not enabled. We
                                recommend enabling it.
                            </AlertDescription>
                        </Alert>
                    </div>
                    <ConfirmWithPassword
                        title="Enable 2FA"
                        content="To start enabling two-factor authentication, you must confirm your password."
                        onConfirmed={enableTwoFactorAuthentication}
                    >
                        <Button type="button" disabled={enabling}>
                            {enabling ? (
                                <span className="flex items-center gap-2">
                                    <LoaderCircle className="size-4 animate-spin" />
                                    Enabling...
                                </span>
                            ) : (
                                'Enable'
                            )}
                        </Button>
                    </ConfirmWithPassword>
                </div>
            )}

            {twoFactorEnabled && !qrCode && (
                <div className="flex flex-col gap-10">
                    <Alert variant="default">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>You're all set</AlertTitle>
                        <AlertDescription>
                            2FA is enabled for your account. You can still
                            disable it if you no longer need it.
                        </AlertDescription>
                    </Alert>
                    {recoveryCodes.length > 0 && (
                        <div className="flex max-w-xl flex-col gap-4">
                            <div className="text-sm">
                                <span className="font-semibold text-red-600 dark:text-red-400">
                                    Important:
                                </span>{' '}
                                These recovery codes will only be shown once.
                                Store them in a secure password manager
                                immediately. They can be used to recover access
                                to your account if your two factor
                                authentication device is lost.
                            </div>

                            <div className="bg-sidebar grid gap-1 rounded-lg p-4 font-mono text-xs">
                                {recoveryCodes.map((code) => (
                                    <div key={code}>{code}</div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="flex gap-4">
                        <ConfirmWithPassword
                            title="Disable 2FA"
                            content="To disable two-factor authentication, you must confirm your password."
                            onConfirmed={disableTwoFactorAuthentication}
                        >
                            <Button type="button" disabled={disabling}>
                                {disabling ? 'Disabling...' : 'Disable'}
                            </Button>
                        </ConfirmWithPassword>
                    </div>
                </div>
            )}
        </section>
    );
}
