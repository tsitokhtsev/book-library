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
import { Form } from '@/Pages/Admin/Books/Partials/Form';
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

            <Card className="flex flex-grow flex-col">
                <CardHeader>
                    <CardTitle>{t('Edit Book')}</CardTitle>
                    <CardDescription>
                        {t('Make changes and save the book')}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-grow flex-col">
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
