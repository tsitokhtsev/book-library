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
import { FormType } from '@/types/form';

const initialData = {
    title: '',
    isbn: '',
    description: '',
    cover_image: '',
    publication_date: '',
    language_id: null,
    genres: [],
    authors: [],
};

export default function Create({
    languages,
    genres,
    authors,
}: {
    languages: SelectOption[];
    genres: SelectOption[];
    authors: SelectOption[];
}) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={t('Add Book')} />

            <Card>
                <CardHeader>
                    <CardTitle>{t('Add Book')}</CardTitle>
                    <CardDescription>
                        {t('Add a new book to the library')}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form
                        type={FormType.Create}
                        languages={languages}
                        genres={genres}
                        authors={authors}
                        initialData={initialData}
                    />
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
