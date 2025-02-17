import { Link } from '@inertiajs/react';
import { Command } from 'lucide-react';

export default function AuthenticationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid min-h-svh">
            <div className="bg-background flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-medium"
                    >
                        <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
                            <Command className="size-4" />
                        </div>
                        React Inertia Laravel
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">{children}</div>
                </div>
            </div>
        </div>
    );
}
