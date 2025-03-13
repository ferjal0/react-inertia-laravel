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

            <div className="flex flex-col gap-10 p-4 sm:p-8 sm:pt-4">
                {isUpdateProfileEnabled && <UpdateProfileInformationForm />}

                {isUpdatePasswordEnabled && <UpdatePasswordForm />}

                <DeleteUserForm />
            </div>
        </AuthenticatedLayout>
    );
}
