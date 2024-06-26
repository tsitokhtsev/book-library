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
    cover_image: string;
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
    bio: string | null;
};
