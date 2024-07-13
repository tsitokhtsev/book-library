export enum FormType {
    Create,
    Edit,
}

export type MemberForm = {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    personal_number: string;
};

export type BookForm = {
    title: string;
    isbn: string;
    description: string | null;
    cover_image?: File;
    publication_date: string;
    language_id: number | null;
    genres: number[];
    authors: number[];
};

export type BookCopyForm = {
    code: string;
    branch_id: number | null;
    status_id: number | null;
    condition_id: number | null;
};

export type AuthorForm = {
    name: string;
    cover_image?: File;
    bio: string | null;
};

export type GenreForm = {
    name: string;
};

export type ConditionForm = {
    name: string;
};

export type BranchForm = {
    is_enabled: boolean;
    name: string;
    address: string;
    phone?: string;
    email?: string;
    working_hours: string;
};

export type SearchForm = {
    genres: number[];
    authors: number[];
    title: string;
    statuses: number[];
    languages: number[];
    branches: number[];
    conditions: number[];
};
