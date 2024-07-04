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
import { Form } from '@/Pages/Admin/Books/Copies/Partials/Form';
import { SelectOption } from '@/types';
import { FormType } from '@/types/form';

const initialData = {
    code: '',
    branch_id: null,
    status_id: null,
    condition_id: null,
};

export default function Create({
    book_id,
    branches,
    statuses,
    conditions,
}: {
    book_id: number;
    branches: SelectOption[];
    statuses: SelectOption[];
    conditions: SelectOption[];
}) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={t('Add Book Copies')} />

            <Card className="flex flex-grow flex-col">
                <CardHeader>
                    <CardTitle>{t('Add Book Copies')}</CardTitle>
                    <CardDescription>
                        {t('Create and add new book copies')}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-grow flex-col">
                    <Form
                        type={FormType.Create}
                        initialData={initialData}
                        bookId={book_id}
                        branches={branches}
                        statuses={statuses}
                        conditions={conditions}
                    />
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
