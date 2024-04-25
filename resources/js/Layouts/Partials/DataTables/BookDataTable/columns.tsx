import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/Components/Button';
import { Checkbox } from '@/Components/Checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/DropdownMenu';
import { Book, SelectOption } from '@/utils/types';

export const columns: ColumnDef<Book>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && undefined)
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
        accessorKey: 'is_enabled',
        header: 'Status',
        cell: ({ row }) => (
            <div className="capitalize">
                {row.getValue('is_enabled') ? 'Enabled' : 'Disabled'}
            </div>
        ),
    },
    {
        accessorKey: 'title',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue('title')}</div>
        ),
    },
    {
        accessorKey: 'isbn',
        header: 'ISBN',
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue('isbn')}</div>
        ),
    },
    {
        accessorKey: 'language',
        header: 'Language',
        cell: ({ row }) => (
            <div className="capitalize">
                {row.getValue<SelectOption>('language').name}
            </div>
        ),
    },
    {
        header: 'Publication Date',
        accessorKey: 'publication_date',
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue('publication_date')}</div>
        ),
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const { t } = useLaravelReactI18n();

            const book = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t('Actions')}</DropdownMenuLabel>
                        <DropdownMenuItem
                            className="bg-green-300 hover:cursor-pointer"
                            onClick={() => {
                                router.visit(
                                    route('admin.books.show', book.isbn),
                                );
                            }}
                        >
                            {t('View/Edit Book')}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                router.post(
                                    route('admin.books.delete', {
                                        isbn: book.isbn,
                                    }),
                                );
                            }}
                            className="bg-red-300 hover:cursor-pointer"
                        >
                            {t('Delete')}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default columns;
