import { ColumnDef } from '@tanstack/react-table';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Badge } from '@/Components/Badge';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { Actions } from '@/Pages/Admin/Books/Copies/Partials/Actions';
import { SelectOption } from '@/types';
import { BookCopy } from '@/types/model';

export const columns: ColumnDef<BookCopy>[] = [
    {
        accessorKey: 'code',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
    },
    {
        accessorKey: 'branch',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            const { t } = useLaravelReactI18n();
            return t(row.getValue<SelectOption>('branch').name);
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            const { t } = useLaravelReactI18n();
            return (
                <Badge variant="outline">
                    {t(row.getValue<SelectOption>('status').name)}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'condition',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            const { t } = useLaravelReactI18n();
            return t(row.getValue<SelectOption>('condition').name);
        },
    },
    {
        id: 'actions',
        cell: ({ row, table }) => (
            <Actions bookCopy={row.original} meta={table.options.meta!} />
        ),
    },
];
