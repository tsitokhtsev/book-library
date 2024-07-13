import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Button } from '@/Components/Button';
import { Card, CardContent } from '@/Components/Card';
import { DataTable } from '@/Components/DataTable';
import Image from '@/Components/Image';
import { H4 } from '@/Components/Typography/H4';
import AdminLayout from '@/Layouts/AdminLayout';
import { columns } from '@/Pages/Admin/Books/Partials/columns';
import { Author, Book } from '@/types/model';

export default function Show({
    author,
    books,
}: {
    author: Author;
    books?: Book[];
}) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={author.name} />

            <Card className="flex flex-grow flex-col">
                <CardContent className="flex flex-grow flex-col">
                    <section>
                        <H4>{t('Name')}</H4>
                        <p>{author.name}</p>
                    </section>

                    <section>
                        <H4>{t('Bio')}</H4>
                        <p>{author.bio}</p>
                    </section>
                    <Image
                        src={'/storage/' + author.cover_image}
                        alt={author.name}
                        fallbackSrc="https://via.placeholder.com/150?text=Author+Image"
                    />
                    <section className="flex flex-grow flex-col">
                        <H4>{t('Books')}</H4>
                        <DataTable
                            data={books ?? []}
                            columns={columns}
                            filterBy="title"
                        />
                    </section>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}