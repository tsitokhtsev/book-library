export interface User {
    id: number;
    name: string;
    email: string;
    mobile: string;
    email_verified_at: string;
    mobile_verified_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
