import { RowData } from '@tanstack/react-table';

export type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: string;
};

export type Member = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    personal_number: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
};

export type MemberForm = {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    personal_number: string;
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
