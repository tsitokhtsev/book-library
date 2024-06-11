import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/Card';
import AdminLayout from '@/Layouts/AdminLayout';
import { Form } from '@/Pages/Admin/Books/Partials/BookForm';
import { SelectOption } from '@/types';
import { BookForm, FormType } from '@/types/form';

export default function Edit({
    book,
    book_id,
    languages,
    genres,
    authors,
}: {
    book: BookForm;
    book_id: number;
    languages: SelectOption[];
    genres: SelectOption[];
    authors: SelectOption[];
}) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={t('Edit Book')} />

            <Card>
                <CardHeader>
                    <CardTitle>{t('Edit Book')}</CardTitle>
                    <CardDescription>
                        {t('Edit the book of the library')}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form
                        type={FormType.Edit}
                        initialData={book}
                        bookId={book_id}
                        languages={languages}
                        genres={genres}
                        authors={authors}
                    />
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
