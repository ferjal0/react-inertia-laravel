import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    isUpdatePasswordEnabled,
    isUpdateProfileEnabled,
}: PageProps<{
    isUpdatePasswordEnabled: boolean;
    isUpdateProfileEnabled: boolean;
}>) {
    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <div className="flex max-w-7xl flex-col sm:px-6 lg:px-8">
                {isUpdateProfileEnabled && (
                    <div className="p-4 sm:p-6">
                        <UpdateProfileInformationForm />
                    </div>
                )}

                {isUpdatePasswordEnabled && (
                    <div className="p-4 sm:p-6">
                        <UpdatePasswordForm />
                    </div>
                )}

                <div className="p-4 sm:p-6">
                    <DeleteUserForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
