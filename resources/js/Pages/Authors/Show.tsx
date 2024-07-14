import { Head } from '@inertiajs/react';

import AuthorDetails from '@/Components/AuthorDetails';
import MainLayout from '@/Layouts/MainLayout';
import { Author, Book } from '@/types/model';

export default function Show({
    author,
    books,
}: {
    author: Author;
    books?: Book[];
}) {
    return (
        <MainLayout>
            <Head title={author.name} />
            <AuthorDetails author={author} books={books} />
        </MainLayout>
    );
}
