import { RowData } from '@tanstack/react-table';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    is_admin: boolean;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
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
