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

            <div className="flex max-w-7xl flex-col sm:px-6 lg:px-8">
                {isTwoFactorAuthenticationFeatureEnabled && (
                    <div className="p-4 sm:p-8">
                        <TwoFactorAuthenticationForm />
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
