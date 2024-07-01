import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { Actions } from '@/Pages/Admin/Authors/Partials/Actions';
import { Author } from '@/types/model';

export const columns: ColumnDef<Author>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
    },
    {
        accessorKey: 'books_count',
        header: ({ column }) => <DataTableColumnHeader label={'Books'} column={column} />,
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <div className="flex justify-end">
                <Actions author={row.original} />
            </div>
        ),
    },
];
