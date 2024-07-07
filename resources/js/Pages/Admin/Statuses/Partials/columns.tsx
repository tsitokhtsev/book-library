import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { Actions } from '@/Pages/Admin/Statuses/Partials/Actions';
import { Status } from '@/types/model';

export const columns: ColumnDef<Status>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
    },
    {
        accessorKey: 'books_count',
        header: ({ column }) => (
            <DataTableColumnHeader label={'Books'} column={column} />
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <div className="flex justify-end">
                <Actions status={row.original} />
            </div>
        ),
    },
];
