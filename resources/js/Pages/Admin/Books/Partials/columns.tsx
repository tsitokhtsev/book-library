import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Button } from '@/Components/Button';
import { Checkbox } from '@/Components/Checkbox';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { Actions } from '@/Pages/Admin/Books/Partials/Actions';
import { SelectOption } from '@/types';
import { Book } from '@/types/model';

export const columns: ColumnDef<Book>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'title',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            const title = row.getValue('title') as string;
            const formattedTitle =
                title.length > 30 ? `${title.slice(0, 30)}...` : title;
            return (
                <Link
                    href={route('admin.books.show', row.original.id)}
                    className="font-medium hover:underline"
                >
                    {formattedTitle}
                </Link>
            );
        },
    },
    // {
    //     accessorKey: 'is_enabled',
    //     header: ({ column }) => <DataTableColumnHeader column={column} />,
    //     cell: ({ row }) => (
    //         <BadgeIsEnabled isEnabled={row.getValue('is_enabled')} />
    //     ),
    // },
    {
        accessorKey: 'isbn',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
    },
    {
        accessorKey: 'language',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            const { t } = useLaravelReactI18n();
            return t(row.getValue<SelectOption>('language').name);
        },
        sortingFn: (a, b) => {
            const { t } = useLaravelReactI18n();
            return t(a.original.language.name).localeCompare(
                t(b.original.language.name),
            );
        },
    },
    {
        accessorKey: 'publication_date',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} label="Published" />
        ),
        cell: ({ row }) => {
            const date = row.getValue('publication_date') as string;
            return new Date(date).toLocaleDateString();
        },
    },
    {
        accessorKey: 'book_copies_count',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} label="Copies" />
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return (
                <div className="flex justify-end">
                    <Actions book={row.original} />
                </div>
            );
        },
    },
];
