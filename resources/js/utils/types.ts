export type FlashType = {
    error: string;
    success: string;
};

export type Book = {
    title: string;
    is_enabled: boolean;
    isbn: string;
    language: { id: number; name: string };
    publication_date: Date;
};

export type SelectOption = {
    id: number;
    name: string;
};

export type SelectOptions = SelectOption[];

export type BookCopy = {
    condition: SelectOption;
    branch: SelectOption;
    code: string;
    status: SelectOption;
};

export enum FormType {
    ADD,
    EDIT,
}
