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
import AdminLayout from '@/Layouts/AdminLayout';
import BookDataTable from '@/Layouts/Partials/DataTables/BookDataTable';
import { Book } from '@/utils/types';

export type BookProps = {
    data: Book[];
    prev_page_url: string;
    next_page_url: string;
    current_index: number;
    per_page: number;
};

export default function Index({ books }: { books: BookProps }) {
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
                    <BookDataTable props={books} />
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
