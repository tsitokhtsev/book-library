import { Head } from '@inertiajs/react';

import BookDetails from '@/Components/BookDetails';
import MainLayout from '@/Layouts/MainLayout';
import { SelectOption } from '@/types';
import { Book, BookCopy } from '@/types/model';

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
    return (
        <MainLayout>
            <Head title={book.title} />

            <div className="container flex flex-grow flex-col">
                <BookDetails
                    book={book}
                    book_copies={book_copies}
                    branches={branches}
                    conditions={conditions}
                    statuses={statuses}
                />
            </div>
        </MainLayout>
    );
}
