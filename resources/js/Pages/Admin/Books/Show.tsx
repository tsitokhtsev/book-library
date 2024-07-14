import { Head } from '@inertiajs/react';

import BookDetails from '@/Components/BookDetails';
import AdminLayout from '@/Layouts/AdminLayout';
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
        <AdminLayout>
            <Head title={book.title} />
            <BookDetails
                book={book}
                book_copies={book_copies}
                branches={branches}
                conditions={conditions}
                statuses={statuses}
            />
        </AdminLayout>
    );
}
