import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Button } from '@/Components/Button';
import AdminLayout from '@/Layouts/AdminLayout';

import { BooksDataTable } from '../Profile/Partials/DataTable';

export type Book = {
    title: string;
    is_enabled: boolean;
    isbn: string;
    language: { id: number; name: string };
    publication_date: Date;
};

export type BookProps = {
    data: Book[];
    prev_page_url: string;
    next_page_url: string;
    current_index: number;
    per_page: number;
};

export default function Books({ props }: { props: BookProps }) {
    const { t } = useLaravelReactI18n();

    console.log('AAAAAAAA', props);

    const handleAddClick = () => {
        return router.visit(route('admin.books.add'));
    };

    return (
        <AdminLayout>
            <Head title={t('Books')} />
            <Button onClick={handleAddClick}>Add New Book</Button>
            <BooksDataTable props={props} />
        </AdminLayout>
    );
}
