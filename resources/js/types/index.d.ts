import { Config } from 'ziggy-js';

export interface Role {
    id: number;
    name: 'administrator' | 'user';
    description: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    profile_photo_url?: string;
    two_factor_confirmed_at: string | null;
    role: Role;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
