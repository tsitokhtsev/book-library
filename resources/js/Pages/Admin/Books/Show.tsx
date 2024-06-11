import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Badge } from '@/Components/Badge';
import { Button } from '@/Components/Button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/Card';
import { H4 } from '@/Components/Typography/H4';
import AdminLayout from '@/Layouts/AdminLayout';
import BookCopyDataTable from '@/Layouts/Partials/DataTables/BookCopyDataTable';
import { SelectOption } from '@/types';
import { Book } from '@/types/model';

export default function Show({
    book,
    book_copies,
    branches,
    conditions,
    statuses,
}: {
    book: Book;
    book_copies: any[];
    branches: SelectOption[];
    conditions: SelectOption[];
    statuses: SelectOption[];
}) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={book.title} />

            <Card>
                <div className="flex flex-col justify-between sm:flex-row">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {book.title}
                            <Badge
                                variant={
                                    book.is_enabled ? 'outline' : 'destructive'
                                }
                            >
                                {t(book.is_enabled ? 'Enabled' : 'Disabled')}
                            </Badge>
                        </CardTitle>
                        <CardDescription>
                            {book.authors
                                .map((author) => author.name)
                                .join(', ')}
                        </CardDescription>
                    </CardHeader>

                    <div className="mx-6 mb-6 flex gap-2 sm:m-6">
                        <Button className="w-full" variant="outline">
                            <Link href={route('admin.books.edit', book.id)}>
                                {t('Edit Book')}
                            </Link>
                        </Button>

                        <Button className="w-full">{t('Add Copy')}</Button>
                    </div>
                </div>

                <CardContent>
                    <div className="grid gap-2 text-muted-foreground">
                        <p>
                            {t('ISBN')}: {book.isbn}
                        </p>
                        <p>
                            {t('Language')}: {book.language.name}
                        </p>
                        <p>
                            {t('Published')}:{' '}
                            {new Date(
                                book.publication_date,
                            ).toLocaleDateString()}
                        </p>
                        <p>
                            {t('Genres')}:{' '}
                            {book.genres.map((genre) => genre.name).join(', ')}
                        </p>
                    </div>

                    {book.description && (
                        <section>
                            <H4>{t('Description')}</H4>
                            <p>{book.description}</p>
                        </section>
                    )}

                    <section>
                        <H4>{t('Book Copies')}</H4>

                        <BookCopyDataTable
                            bookCopies={book_copies}
                            branches={branches}
                            conditions={conditions}
                            statuses={statuses}
                        />
                    </section>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
