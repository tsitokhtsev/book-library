export type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: string;
    is_admin: boolean;
};

export type Member = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    personal_number: string;
};

export type Book = {
    id: number;
    title: string;
    is_enabled: boolean;
    isbn: string;
    description?: string;
    cover_image?: string;
    publication_date: string;
    language: { id: number; name: string };
    genres: { id: number; name: string }[];
    authors: { id: number; name: string }[];
    book_copies_count: number;
};

export type BookCopy = {
    id: number;
    code: string;
    book_id: number;
    branch: { id: number; name: string };
    branch_id: number;
    status: { id: number; name: string };
    status_id: number;
    condition: { id: number; name: string };
    condition_id: number;
};
