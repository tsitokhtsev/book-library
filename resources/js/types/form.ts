export enum FormType {
    Create,
    Edit,
}

export type BookForm = {
    title: string;
    isbn: string;
    description: string;
    cover_image: string;
    publication_date: string;
    language: number | null;
    genres: number[];
    authors: number[];
};
