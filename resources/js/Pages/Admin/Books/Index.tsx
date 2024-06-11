import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Button } from '@/Components/Button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/Card';
import { DataTable } from '@/Components/DataTable';
import AdminLayout from '@/Layouts/AdminLayout';
import { columns } from '@/Pages/Admin/Books/Partials/BookTable/columns';
import { Book } from '@/types/model';

export default function Index({ books }: { books: Book[] }) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={t('Books')} />

            <Card>
                <div className="flex flex-col justify-between sm:flex-row">
                    <CardHeader>
                        <CardTitle>{t('Books')}</CardTitle>
                        <CardDescription>
                            {t('View and manage books of the library')}
                        </CardDescription>
                    </CardHeader>

                    <Button className="mx-6 sm:m-6" asChild>
                        <Link href={route('admin.books.create')}>
                            {t('Add Book')}
                        </Link>
                    </Button>
                </div>

                <CardContent>
                    <DataTable
                        data={books}
                        columns={columns}
                        filterBy="title"
                        massDeleteRoute="admin.books.massDelete"
                    />
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
