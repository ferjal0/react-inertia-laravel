import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { TwoFactorAuthenticationForm } from './Partials/TwoFactorAuthenticationForm';

export default function Show({
    isTwoFactorAuthenticationFeatureEnabled,
}: PageProps<{
    isTwoFactorAuthenticationFeatureEnabled: boolean;
}>) {
    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <div className="flex flex-col">
                {isTwoFactorAuthenticationFeatureEnabled && (
                    <div className="p-4 sm:p-8 sm:pt-4">
                        <TwoFactorAuthenticationForm />
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
