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

            <Card className="flex flex-grow flex-col">
                <CardHeader>
                    <CardTitle>{t('Add Book')}</CardTitle>
                    <CardDescription>
                        {t('Add a new book to the library')}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-grow flex-col">
                    <Form
                        type={FormType.Create}
                        initialData={initialData}
                        languages={languages}
                        genres={genres}
                        authors={authors}
                    />
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
