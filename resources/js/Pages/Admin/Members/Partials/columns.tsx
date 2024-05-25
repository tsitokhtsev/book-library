import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import Actions from '@/Pages/Admin/Members/Partials/Actions';
import { Member } from '@/types';

export const columns: ColumnDef<Member>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID" />
        ),
    },
    {
        accessorKey: 'first_name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="First name" />
        ),
    },
    {
        accessorKey: 'last_name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Last name" />
        ),
    },
    {
        accessorKey: 'email',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    {
        accessorKey: 'phone_number',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone number" />
        ),
    },
    {
        accessorKey: 'personal_number',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Personal number" />
        ),
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created at" />
        ),
        cell: ({ row }) => {
            const date = row.getValue('created_at') as string;
            const formatted = new Date(date).toLocaleDateString();

            return <div>{formatted}</div>;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => <Actions member={row.original} />,
    },
];
