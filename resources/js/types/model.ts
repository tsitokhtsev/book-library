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
    id: number;
    code: string;
    branch: { id: number; name: string };
    branch_id: number;
    status: { id: number; name: string };
    status_id: number;
    condition: { id: number; name: string };
    condition_id: number;
};
