import { Link, router } from '@inertiajs/react';
import { BookOpenTextIcon, HeartIcon } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/Components/Card';
import Image from '@/Components/Image';
import { cn } from '@/lib/utils';
import { Book } from '@/types/model';

export function BookCard({ book }: { book: Book }) {
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
        <Link href={route('books.show', book.id)}>
            <Card className="transition-shadow duration-300 hover:shadow-md">
                <CardHeader className="aspect-3/4 relative justify-center">
                    <HeartIcon
                        onClick={handleWishlistClick}
                        className={cn(
                            'absolute right-4 top-4 text-red-500 hover:fill-red-500',
                            { 'fill-red-500': book.is_in_wishlist },
                        )}
                    />

                    {book.cover_image ? (
                        <Image
                            src={'/storage/' + book.cover_image}
                            alt={book.title}
                            className="h-full rounded object-cover"
                            fallbackSrc="https://via.placeholder.com/150?text=Book+Image"
                        />
                    ) : (
                        <BookOpenTextIcon className="h-1/3 w-full text-gray-300" />
                    )}
                </CardHeader>

                <CardContent className="flex flex-col gap-1">
                    <p className="line-clamp-3 text-lg font-semibold">
                        {book.title}
                    </p>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                        {book.authors.map((author) => author.name).join(', ')}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}
