import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Button } from '@/Components/Button';
import AdminLayout from '@/Layouts/AdminLayout';
import { Book } from '@/utils/types';

import { BooksDataTable } from '../Profile/Partials/BookDataTable';

export type BookProps = {
    data: Book[];
    prev_page_url: string;
    next_page_url: string;
    current_index: number;
    per_page: number;
};

export default function Books({ props }: { props: BookProps }) {
    const { t } = useLaravelReactI18n();

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
