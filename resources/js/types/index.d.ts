import { RowData } from '@tanstack/react-table';

export type User = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    email_verified_at: string;
};

export type Member = {
    id: number;
    email: string;
    personal_number: string;
    phone: string;
    firstname: string;
    lastname: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
};

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
