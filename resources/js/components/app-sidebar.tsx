'use client';

import { Atom, LayoutDashboard, LifeBuoy, Send } from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavProjectMembers } from '@/components/nav-project-members';
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
            title: 'Support',
            url: '/dashboard',
            icon: LifeBuoy,
        },
        {
            title: 'Feedback',
            url: '/dashboard',
            icon: Send,
        },
    ],
    projectMembers: [
        {
            name: 'Tylor Otwell',
            url: '#',
            isConnected: true,
        },
        {
            name: 'Jonathan Reinink',
            url: '#',
            isConnected: false,
        },
        {
            name: 'Adam Wathan',
            url: '#',
            isConnected: false,
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
                <NavProjectMembers members={data.projectMembers} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}
