import { Head } from '@inertiajs/react';

import BookDetails from '@/Components/BookDetails';
import AdminLayout from '@/Layouts/AdminLayout';
import { SelectOption } from '@/types';
import { Book, BookCopy, Review } from '@/types/model';

export default function Show({
    book,
    book_copies,
    branches,
    conditions,
    statuses,
    average_rating,
    reviews,
    user_has_review,
}: {
    book: Book;
    book_copies: BookCopy[];
    branches: SelectOption[];
    conditions: SelectOption[];
    statuses: SelectOption[];
    average_rating: number;
    reviews: Review[];
    user_has_review?: boolean;
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
                average_rating={average_rating}
                reviews={reviews}
                user_has_review={user_has_review ?? false}
            />
        </AdminLayout>
    );
}
