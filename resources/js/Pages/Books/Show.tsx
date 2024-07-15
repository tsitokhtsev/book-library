import { Head } from '@inertiajs/react';

import BookDetails from '@/Components/BookDetails';
import MainLayout from '@/Layouts/MainLayout';
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
    user_has_review: boolean;
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
                    average_rating={average_rating}
                    reviews={reviews}
                    user_has_review={user_has_review}
                />
            </div>
        </MainLayout>
    );
}
