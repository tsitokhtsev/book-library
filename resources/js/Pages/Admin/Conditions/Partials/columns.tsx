import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { Actions } from '@/Pages/Admin/Conditions/Partials/Actions';
import { Condition } from '@/types/model';

export const columns: ColumnDef<Condition>[] = [
    {
        accessorKey: 'name',
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
                <Actions condition={row.original} />
            </div>
        ),
    },
];
