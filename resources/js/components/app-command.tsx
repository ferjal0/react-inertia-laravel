import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { router } from '@inertiajs/react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { BadgeCheck, LayoutDashboard, Lock, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from './theme-provider';
import { DialogDescription, DialogTitle } from './ui/dialog';

interface NavigationItem {
    title: string;
    href: string;
    icon: React.ReactNode;
}

const navigationItems: NavigationItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: <LayoutDashboard />,
    },
    {
        title: 'Profile',
        href: '/account/profile',
        icon: <BadgeCheck />,
    },
    {
        title: 'Security',
        href: '/account/security',
        icon: <Lock />,
    },
];

export function AppCommand() {
    const [isOpen, setIsOpen] = useState(false);

    const { setTheme } = useTheme();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const goToRoute = (href: string) => {
        setIsOpen(false);
        router.visit(href);
    };

    const setMode = (mode: 'dark' | 'light') => {
        setIsOpen(false);
        setTheme(mode);
    };

    return (
        <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
            <VisuallyHidden>
                <DialogTitle>Search</DialogTitle>
                <DialogDescription>
                    Use this command to search for specific commands.
                </DialogDescription>
            </VisuallyHidden>
            <Command>
                <CommandInput placeholder="Search commands..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Go to...">
                        {navigationItems.map((item) => (
                            <CommandItem
                                key={item.href}
                                onSelect={() => goToRoute(item.href)}
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Theme">
                        <CommandItem onSelect={() => setMode('dark')}>
                            <Moon />
                            <span>Dark Mode</span>
                        </CommandItem>
                        <CommandItem onSelect={() => setMode('light')}>
                            <Sun />
                            <span>Light Mode</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </CommandDialog>
    );
}
