import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { ArrowUpRightIcon, BookIcon, DramaIcon, UsersIcon } from 'lucide-react';

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
import { columns } from '@/Pages/Admin/Books/Partials/columns';
import { Book } from '@/types/model';

export default function Index({
    books,
    books_count,
    authors_count,
    genres_count,
}: {
    books: Book[];
    books_count: number;
    authors_count: number;
    genres_count: number;
}) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={t('Books')} />

            <Card className="flex flex-grow flex-col">
                <div className="flex flex-col justify-between sm:flex-row">
                    <CardHeader>
                        <CardTitle>{t('Books')}</CardTitle>
                        <CardDescription>
                            {t('View and manage books')}
                        </CardDescription>
                    </CardHeader>

                    <Button className="mx-6 mb-6 sm:m-6" asChild>
                        <Link href={route('admin.books.create')}>
                            {t('Add Book')}
                        </Link>
                    </Button>
                </div>

                <CardContent className="flex flex-grow flex-col gap-8">
                    <div className="grid gap-4 sm:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <div className="flex items-baseline gap-4 md:gap-6">
                                    <span className="text-5xl">
                                        {books_count}
                                    </span>
                                    <h2 className="text-sm font-medium">
                                        <BookIcon className="mr-2 h-4 w-4" />
                                        {t('Book')}
                                    </h2>
                                </div>
                            </CardHeader>
                        </Card>
                        <Card>
                            <Link href={route('admin.authors')}>
                                <CardHeader>
                                    <div className="flex items-baseline gap-4 md:gap-6">
                                        <span className="text-5xl">
                                            {authors_count}
                                        </span>
                                        <h2 className="text-sm font-medium">
                                            <UsersIcon className="mr-2 h-4 w-4" />
                                            {t('Author')}
                                        </h2>
                                        <ArrowUpRightIcon className="ml-auto self-start" />
                                    </div>
                                </CardHeader>
                            </Link>
                        </Card>
                        <Card>
                            <Link href={route('admin.genres')}>
                                <CardHeader>
                                    <div className="flex items-baseline gap-4 md:gap-6">
                                        <span className="text-5xl">
                                            {genres_count}
                                        </span>
                                        <h2 className="text-sm font-medium">
                                            <DramaIcon className="mr-2 h-4 w-4" />
                                            {t('Genre')}
                                        </h2>
                                        <ArrowUpRightIcon className="ml-auto self-start" />
                                    </div>
                                </CardHeader>
                            </Link>
                        </Card>
                    </div>

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
