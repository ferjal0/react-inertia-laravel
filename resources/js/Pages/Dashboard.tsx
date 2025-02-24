import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="aspect-video rounded-xl bg-sidebar" />
                    <div className="aspect-video rounded-xl bg-sidebar" />
                    <div className="aspect-video rounded-xl bg-sidebar" />
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-sidebar md:min-h-min" />
            </div>
        </AuthenticatedLayout>
    );
}
