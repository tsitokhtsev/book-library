export enum FormType {
    Create,
    Edit,
}

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
