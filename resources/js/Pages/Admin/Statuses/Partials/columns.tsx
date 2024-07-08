import { ColumnDef } from '@tanstack/react-table';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { Actions } from '@/Pages/Admin/Statuses/Partials/Actions';
import { Status } from '@/types/model';

export const columns: ColumnDef<Status>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            const { t } = useLaravelReactI18n();
            return t(row.getValue('name'));
        },
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
                <Actions status={row.original} />
            </div>
        ),
    },
];
