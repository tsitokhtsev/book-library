import { RowData } from '@tanstack/react-table';

import { User } from '@/types/model';

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash: {
        success: string;
        error: string;
    };
};

export type SelectOption = {
    id: number;
    name: string;
};

declare module '@tanstack/table-core' {
    interface TableMeta<TData extends RowData> {
        conditions: SelectOption[];
        branches: SelectOption[];
        statuses: SelectOption[];
    }
}
