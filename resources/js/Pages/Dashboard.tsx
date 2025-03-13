import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex flex-1 flex-col gap-4 p-4 sm:p-8 sm:pt-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="bg-sidebar aspect-video rounded-xl" />
                    <div className="bg-sidebar aspect-video rounded-xl" />
                    <div className="bg-sidebar aspect-video rounded-xl" />
                </div>
                <div className="bg-sidebar min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
            </div>
        </AuthenticatedLayout>
    );
}
