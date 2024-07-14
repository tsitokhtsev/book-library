import { Link, router } from '@inertiajs/react';
import { HeartIcon } from 'lucide-react';
import React, { useState } from 'react';

import Image from '@/Components/Image';
import useRoute from '@/lib/hooks/useRoute';
import { Book } from '@/types/model';

import HeartSolidIcon from './HeartSolidIcon';

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    const [isHovered, setIsHovered] = useState(false);

    const addToWishlist = () => {
        router.post(route('wishlist.store', { book_id: book.id }));
    };

    const removeFromWishlist = () => {
        router.delete(route('wishlist.destroy', book.id));
    };

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (book.is_in_wishlist) {
            removeFromWishlist();
        } else {
            addToWishlist();
        }
    };

    return (
        <Link href={useRoute('books.show', book.id)}>
            <div className="flex h-max flex-col justify-between rounded-lg p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <div>
                    <h2 className="mb-2 text-lg font-bold">{book.title}</h2>
                    <div className="relative mb-2 h-72 w-full">
                        <Image
                            src={'/storage/' + book.cover_image}
                            alt={book.title}
                            className="h-full w-full rounded object-cover"
                            fallbackSrc="https://via.placeholder.com/150?text=Book+Image"
                        />
                        <button
                            onClick={handleWishlistClick}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="absolute right-2 top-2 text-red-500"
                        >
                            {book.is_in_wishlist || isHovered ? (
                                <HeartSolidIcon />
                            ) : (
                                <HeartIcon />
                            )}
                        </button>
                    </div>
                </div>
                <p className="text-sm text-gray-600">
                    {book.authors.map((author) => author.name).join(', ')}
                </p>
            </div>
        </Link>
    );
};

export default BookCard;
