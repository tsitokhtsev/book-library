import { ColumnDef } from '@tanstack/react-table';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Badge } from '@/Components/Badge';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { SelectOption } from '@/types';
import { BookCopy } from '@/types/model';

import { Actions } from './Actionts';

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
        sortingFn: (a, b) => {
            const { t } = useLaravelReactI18n();
            return t(a.original.branch.name).localeCompare(
                t(b.original.branch.name),
            );
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
        sortingFn: (a, b) => {
            const { t } = useLaravelReactI18n();
            return t(a.original.status.name).localeCompare(
                t(b.original.status.name),
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
        sortingFn: (a, b) => {
            const { t } = useLaravelReactI18n();
            return t(a.original.condition.name).localeCompare(
                t(b.original.condition.name),
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row, table }) => (
            <Actions bookCopy={row.original} meta={table.options.meta!} />
        ),
    },
];
