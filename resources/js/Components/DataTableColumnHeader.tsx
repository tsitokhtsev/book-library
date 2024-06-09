import { Column } from '@tanstack/react-table';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from 'lucide-react';

import { Button } from '@/Components/Button';
import { cn } from '@/lib/utils';
import { capitalize } from '@/lib/utils';

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    const { t } = useLaravelReactI18n();

    const title = capitalize(column.id.replace(/_/g, ' '));

    if (!column.getCanSort()) {
        return <div className={cn(className)}>{t(title)}</div>;
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
            onClick={() => column.toggleSorting()}
        >
            <span>{t(title)}</span>
            {column.getIsSorted() === 'desc' ? (
                <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'asc' ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
                <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
            )}
        </Button>
    );
}
