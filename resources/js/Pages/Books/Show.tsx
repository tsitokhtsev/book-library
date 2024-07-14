import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Badge } from '@/Components/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Card';
import { DataTable } from '@/Components/DataTable';
import Image from '@/Components/Image';
import { H4 } from '@/Components/Typography/H4';
import AdminLayout from '@/Layouts/AdminLayout';
import { SelectOption } from '@/types';
import { Book, BookCopy } from '@/types/model';

import { columns } from './Partials/columnts';

export default function Show({
    book,
    book_copies,
    branches,
    conditions,
    statuses,
}: {
    book: Book;
    book_copies: BookCopy[];
    branches: SelectOption[];
    conditions: SelectOption[];
    statuses: SelectOption[];
}) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={book.title} />

            <Card className="flex flex-grow flex-col">
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
                    </CardHeader>
                </div>

                <CardContent className="flex flex-grow flex-col">
                    <div className="grid gap-2 text-muted-foreground">
                        <p>
                            {t('ISBN')}: {book.isbn}
                        </p>
                        <Image
                            src={'/storage/' + book.cover_image}
                            alt={book.title}
                            fallbackSrc="https://via.placeholder.com/150?text=Author+Image"
                        />
                        <p>
                            {t('Genres')}:{' '}
                            {book.genres.map((genre) => genre.name).join(', ')}
                        </p>
                        <p>
                            {t('Authors')}:{' '}
                            {book.authors
                                .map((author) => author.name)
                                .join(', ')}
                        </p>
                        <p>
                            {t('Language')}: {t(book.language.name)}
                        </p>
                        <p>
                            {t('Published')}:{' '}
                            {new Date(
                                book.publication_date,
                            ).toLocaleDateString()}
                        </p>
                    </div>

                    {book.description && (
                        <section>
                            <H4>{t('Description')}</H4>
                            <p>{book.description}</p>
                        </section>
                    )}
                    <section className="flex flex-grow flex-col">
                        <H4>{t('Book Copies')}</H4>
                        <DataTable
                            data={book_copies}
                            columns={columns}
                            filterBy="code"
                            meta={{ branches, statuses, conditions }}
                        />
                    </section>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
