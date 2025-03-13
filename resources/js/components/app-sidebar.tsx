'use client';

import {
    Atom,
    Book,
    BookCheck,
    BookHeart,
    BookImage,
    LayoutDashboard,
} from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import { ProjectSwitcher } from '@/components/project-switcher';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from '@/components/ui/sidebar';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

const data = {
    projects: [
        {
            logo: Atom,
            title: 'Starter',
            subtitle: 'React - Inertia - Laravel',
        },
    ],
    navMain: [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: LayoutDashboard,
        },
    ],
    navSecondary: [
        {
            title: 'Readme',
            url: 'https://github.com/ferjal0/react-inertia-laravel/blob/main/README.md',
            icon: Book,
        },
        {
            title: 'Getting Started',
            url: 'https://github.com/ferjal0/react-inertia-laravel/blob/main/docs/getting-started.md',
            icon: BookHeart,
        },
        {
            title: 'Frontend Docs',
            url: 'https://github.com/ferjal0/react-inertia-laravel/blob/main/docs/frontend.md',
            icon: BookImage,
        },
        {
            title: 'Backend Docs',
            url: 'https://github.com/ferjal0/react-inertia-laravel/blob/main/docs/backend.md',
            icon: BookCheck,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    return (
        <Sidebar variant="inset" collapsible="icon" {...props}>
            <SidebarHeader>
                <ProjectSwitcher projects={data.projects} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}
