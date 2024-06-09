import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/Components/Checkbox';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { IsEnabledBadge } from '@/Components/IsEnabledBadge';
import Actions from '@/Pages/Admin/Books/Partials/Actions';
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
    },
    {
        accessorKey: 'is_enabled',
        header: 'Status',
        cell: ({ row }) => (
            <IsEnabledBadge isEnabled={row.getValue('is_enabled')} />
        ),
    },
    {
        accessorKey: 'isbn',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
    },
    {
        accessorKey: 'language',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => (
            <div>{row.getValue<SelectOption>('language').name}</div>
        ),
    },
    {
        accessorKey: 'publication_date',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            const date = row.getValue('publication_date') as string;
            const formatted = new Date(date).toLocaleDateString();

            return <div>{formatted}</div>;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => <Actions book={row.original} />,
    },
];
