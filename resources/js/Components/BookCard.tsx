import { Link } from '@inertiajs/react';
import React from 'react';

import Image from '@/Components/Image';
import { Book } from '@/types/model';

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    return (
        <Link href="#">
            <div className="rounded-lg p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <h2 className="mb-2 text-lg font-bold">{book.title}</h2>
                <Image
                    src={'/storage/' + book.cover_image}
                    alt={book.title}
                    class="mb-2 h-auto w-full rounded"
                    fallbackSrc="https://via.placeholder.com/150?text=Book+Image"
                />
                <p className="text-sm text-gray-600">
                    {book.authors.map((author) => author.name).join(', ')}
                </p>
            </div>
        </Link>
    );
};

export default BookCard;
