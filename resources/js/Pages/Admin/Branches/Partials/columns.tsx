import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { IsEnabledBadge } from '@/Components/IsEnabledBadge';
import { Actions } from '@/Pages/Admin/Branches/Partials/Actions';
import { Branch } from '@/types/model';

export const columns: ColumnDef<Branch>[] = [
    {
        accessorKey: 'is_enabled',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => (
            <IsEnabledBadge isEnabled={row.getValue('is_enabled')} />
        ),
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
    },
    {
        accessorKey: 'address',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
    },
    {
        accessorKey: 'working_hours',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
    },
    {
        accessorKey: 'email',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
    },
    {
        accessorKey: 'phone',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
    },
    {
        accessorKey: 'book_copies_count',
        header: ({ column }) => (
            <DataTableColumnHeader label={'Books'} column={column} />
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <div className="flex justify-end">
                <Actions branch={row.original} />
            </div>
        ),
    },
];
