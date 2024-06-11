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
