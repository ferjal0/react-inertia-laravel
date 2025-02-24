import { Ripple } from '@/components/ui/ripple';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Command } from 'lucide-react';

export default function Welcome({ auth }: PageProps) {
    return (
        <>
            <Head title="Welcome" />

            <div className="flex h-svh flex-col">
                <header>
                    <div className="mx-auto flex max-w-7xl items-center justify-between p-6 md:p-10">
                        <a
                            href="#"
                            className="flex items-center gap-2 font-medium"
                        >
                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                <Command className="size-4" />
                            </div>
                            React Inertia Laravel
                        </a>

                        <nav className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="mx-auto h-full w-full max-w-7xl grow">
                    <div className="relative flex h-full items-center justify-center">
                        <p className="text-[clamp(1.5rem,5vw,4rem)] leading-none">
                            Your landing goes here
                        </p>
                        <Ripple />
                    </div>
                </main>
            </div>
        </>
    );
}
