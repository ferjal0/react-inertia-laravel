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

            <div className="flex flex-col">
                {isUpdateProfileEnabled && (
                    <div className="p-4 sm:p-8 sm:pt-4">
                        <UpdateProfileInformationForm />
                    </div>
                )}

                {isUpdatePasswordEnabled && (
                    <div className="p-4 sm:p-8 sm:pt-4">
                        <UpdatePasswordForm />
                    </div>
                )}

                <div className="p-4 sm:p-8 sm:pt-4">
                    <DeleteUserForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
