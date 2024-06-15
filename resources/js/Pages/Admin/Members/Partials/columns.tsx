import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { Actions } from '@/Pages/Admin/Members/Partials/Actions';
import { Member } from '@/types/model';

export const columns: ColumnDef<Member>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
    },
    {
        accessorKey: 'first_name',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
    },
    {
        accessorKey: 'last_name',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
    },
    {
        accessorKey: 'email',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
    },
    {
        accessorKey: 'phone_number',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
    },
    {
        accessorKey: 'personal_number',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
    },
    {
        id: 'actions',
        cell: ({ row }) => <Actions member={row.original} />,
    },
];
