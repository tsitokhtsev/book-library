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
    description: string | null;
    cover_image: string | null;
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

export type Author = {
    id: number;
    name: string;
    bio: string | null;
    books_count: number;
};

export type Genre = {
    id: number;
    name: string;
    books_count: number;
};

export type Condition = {
    id: number;
    name: string;
    books_count: number;
};

export type Status = {
    id: number;
    name: string;
    books_count: number;
};
