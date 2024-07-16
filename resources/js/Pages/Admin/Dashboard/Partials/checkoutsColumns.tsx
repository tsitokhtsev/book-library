import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { BadgeCheckoutStatus, badgeVariants } from '@/Components/Badge';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { Checkout } from '@/types/model';

export const columns: ColumnDef<Checkout>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
    },
    {
        accessorKey: 'book',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            const book = row.original.book;
            const formattedTitle =
                book.title.length > 30
                    ? `${book.title.slice(0, 30)}...`
                    : book.title;

            return (
                <div className="space-y-1">
                    <Link
                        href={route('admin.books.show', book.id)}
                        className="font-medium hover:underline"
                    >
                        {formattedTitle}
                    </Link>
                    <p className="text-muted-foreground">{book.code}</p>
                </div>
            );
        },
        sortingFn: (a, b) => {
            return a.original.book.title.localeCompare(b.original.book.title);
        },
    },
    {
        accessorKey: 'member',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            const member = row.original.member;

            return (
                <div className="space-y-1">
                    <p>
                        {member.first_name} {member.last_name}
                    </p>
                    <p className="text-muted-foreground">
                        {member.personal_number}
                    </p>
                </div>
            );
        },
        sortingFn: (a, b) => {
            return a.original.member.first_name.localeCompare(
                b.original.member.first_name,
            );
        },
        filterFn: (row, id, filterValue) => {
            const search = [
                row.original.book.title,
                row.original.book.code,
                row.original.member.first_name,
                row.original.member.last_name,
                row.original.member.personal_number,
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

            let searchTerms = Array.isArray(filterValue)
                ? filterValue
                : [filterValue];

            return searchTerms.some((term) =>
                search.includes(term.toLowerCase()),
            );
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            return (
                <BadgeCheckoutStatus
                    status={
                        row.original.status.name as keyof typeof badgeVariants
                    }
                />
            );
        },
        sortingFn: (a, b) => {
            const { t } = useLaravelReactI18n();
            return t(a.original.status.name).localeCompare(
                t(b.original.status.name),
            );
        },
    },
    {
        accessorKey: 'checkout_date',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            return new Date(row.original.due_date).toLocaleDateString();
        },
    },
    {
        accessorKey: 'due_date',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            return new Date(row.original.due_date).toLocaleDateString();
        },
    },
    {
        accessorKey: 'return_date',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            return row.original.return_date
                ? new Date(row.original.return_date).toLocaleDateString()
                : '-';
        },
    },
];
