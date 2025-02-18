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

            <div className="flex max-w-7xl flex-col gap-16 px-8 py-4">
                {isUpdateProfileEnabled && <UpdateProfileInformationForm />}

                {isUpdatePasswordEnabled && <UpdatePasswordForm />}

                <DeleteUserForm />
            </div>
        </AuthenticatedLayout>
    );
}
