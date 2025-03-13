import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import ErrorFeedback from '@/components/ui/error-feedback';
import { Input } from '@/components/ui/input';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import axios from 'axios';
import { useRef, useState } from 'react';
import { Label } from './ui/label';

interface ConfirmWithPasswordProps {
    title?: string;
    content?: string;
    button?: string;
    children: React.ReactNode;
    onConfirmed: () => void;
}

export default function ConfirmWithPassword({
    title = 'Confirm action with Password',
    content = 'This action is irreversible. Please type your password to confirm.',
    button = 'Confirm',
    children,
    onConfirmed,
}: ConfirmWithPasswordProps) {
    const [confirmingPassword, setConfirmingPassword] = useState(false);
    const [form, setForm] = useState({
        password: '',
        error: '',
        processing: false,
    });

    const passwordInput = useRef<HTMLInputElement>(null);

    const startConfirmingPassword = () => {
        axios.get(route('password.confirmation')).then((response) => {
            if (response.data.confirmed) {
                onConfirmed();
            } else {
                setConfirmingPassword(true);
                setTimeout(() => passwordInput.current?.focus(), 250);
            }
        });
    };

    const confirmPassword = () => {
        setForm((prev) => ({ ...prev, processing: true }));

        axios
            .post(route('password.confirm'), {
                password: form.password,
            })
            .then(() => {
                closeModal();
                onConfirmed();
            })
            .catch((error) => {
                setForm((prev) => ({
                    ...prev,
                    processing: false,
                    error: error.response.data.errors.password[0],
                }));
                passwordInput.current?.focus();
            });
    };

    const closeModal = () => {
        setConfirmingPassword(false);
        setForm({
            password: '',
            error: '',
            processing: false,
        });
    };

    return (
        <>
            <span onClick={startConfirmingPassword}>{children}</span>

            <Dialog
                open={confirmingPassword}
                onOpenChange={(open) => {
                    if (!open) closeModal();
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <VisuallyHidden>
                            <DialogDescription>{content}</DialogDescription>
                        </VisuallyHidden>
                    </DialogHeader>

                    <div className="flex flex-col gap-4">
                        <p className="text-muted-foreground text-sm">
                            {content}
                        </p>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                ref={passwordInput}
                                type="password"
                                id="password"
                                value={form.password}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        password: e.target.value,
                                    }))
                                }
                                autoComplete="current-password"
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') {
                                        confirmPassword();
                                    }
                                }}
                            />
                        </div>

                        <ErrorFeedback message={form.error} />
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={closeModal}>
                            Cancel
                        </Button>

                        <Button
                            onClick={confirmPassword}
                            disabled={form.processing}
                            className={form.processing ? 'opacity-25' : ''}
                        >
                            {button}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
