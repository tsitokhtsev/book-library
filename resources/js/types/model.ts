import { SelectOption } from '@/types';

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
};

export type BookCopy = {
    condition: SelectOption;
    branch: SelectOption;
    code: string;
    status: SelectOption;
};
