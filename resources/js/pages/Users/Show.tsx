import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useDebounce } from '@/hooks/use-debounce';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { cn } from '@/lib/utils';
import { Head, router } from '@inertiajs/react';
import { ArrowUpDown, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface User {
    id: number;
    name: string;
    email: string;
    role: {
        id: number;
        name: string;
    };
}

interface Props {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    filters: {
        search: string;
        sort: string;
        direction: 'asc' | 'desc';
    };
}

const getVisiblePageNumbers = (
    currentPage: number,
    lastPage: number,
    radius: number = 2,
) => {
    const pages: (number | null)[] = [];

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    const rangeStart = Math.max(2, currentPage - radius);
    const rangeEnd = Math.min(lastPage - 1, currentPage + radius);

    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
        pages.push(null);
    }

    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (rangeEnd < lastPage - 1) {
        pages.push(null);
    }

    // Always show last page if it's not the first page
    if (lastPage > 1) {
        pages.push(lastPage);
    }

    return pages;
};

export default function UsersIndex({ users, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const debouncedSearch = useDebounce(search, 300);
    const [sorting, setSorting] = useState({
        column: filters.sort || '',
        direction: filters.direction || 'asc',
    });

    useEffect(() => {
        router.get(
            route('users.index'),
            {
                search: debouncedSearch,
                sort: sorting.column,
                direction: sorting.direction,
            },
            { preserveState: true },
        );
    }, [debouncedSearch, sorting]);

    const handleSort = (column: string) => {
        const direction =
            sorting.column === column && sorting.direction === 'asc'
                ? 'desc'
                : 'asc';
        setSorting({ column, direction });
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleDelete = (user: User) => {
        router.delete(route('users.destroy', user.id), {
            onSuccess: () => {
                toast.success(`User ${user.name} deleted successfully.`);
            },
        });
    };

    const handlePageClick = (url: string) => {
        if (!url) return;
        router.get(url, {}, { preserveState: true });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Users" />

            <div className="flex max-w-7xl flex-col">
                <section className="flex flex-col gap-6 px-8 py-4">
                    <header className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <h2 className="text-primary text-lg font-medium">
                                Users
                            </h2>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Manage user accounts and their permissions in your
                            application.
                        </p>
                    </header>

                    <div className="flex items-center gap-4">
                        <div className="relative max-w-sm flex-1">
                            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <Input
                                type="search"
                                placeholder="Search users..."
                                value={search}
                                onChange={handleSearch}
                                className="pl-8"
                            />
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-20">
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleSort('id')}
                                            className="font-medium"
                                        >
                                            ID
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleSort('name')}
                                            className="font-medium"
                                        >
                                            Name
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleSort('email')}
                                            className="font-medium"
                                        >
                                            Email
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead className="w-20">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">
                                            {user.id}
                                        </TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    user.role.name === 'admin'
                                                        ? 'destructive'
                                                        : 'default'
                                                }
                                            >
                                                {user.role.name}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="hover:text-red-500"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Delete User
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you
                                                            want to delete{' '}
                                                            <span className="font-medium">
                                                                {user.name}
                                                            </span>
                                                            ? This action cannot
                                                            be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                handleDelete(
                                                                    user,
                                                                )
                                                            }
                                                            className="bg-red-500 hover:bg-red-600"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-between gap-6">
                        <div className="min-w-fit text-sm text-gray-600 dark:text-gray-400">
                            Showing {users.data.length} of {users.total} users
                        </div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() =>
                                            handlePageClick(
                                                `${route('users.index')}?page=${
                                                    users.current_page - 1
                                                }`,
                                            )
                                        }
                                        className={cn(
                                            users.current_page === 1 &&
                                                'pointer-events-none opacity-50',
                                            'cursor-pointer',
                                        )}
                                    />
                                </PaginationItem>

                                {getVisiblePageNumbers(
                                    users.current_page,
                                    users.last_page,
                                ).map((pageNumber, i) =>
                                    pageNumber === null ? (
                                        <PaginationItem key={`ellipsis-${i}`}>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    ) : (
                                        <PaginationItem key={pageNumber}>
                                            <PaginationLink
                                                onClick={() =>
                                                    handlePageClick(
                                                        `${route(
                                                            'users.index',
                                                        )}?page=${pageNumber}`,
                                                    )
                                                }
                                                isActive={
                                                    pageNumber ===
                                                    users.current_page
                                                }
                                                className="cursor-pointer"
                                            >
                                                {pageNumber}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ),
                                )}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() =>
                                            handlePageClick(
                                                `${route('users.index')}?page=${
                                                    users.current_page + 1
                                                }`,
                                            )
                                        }
                                        className={cn(
                                            users.current_page ===
                                                users.last_page &&
                                                'pointer-events-none opacity-50',
                                            'cursor-pointer',
                                        )}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
