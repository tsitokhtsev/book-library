import { router } from '@inertiajs/react';

import BookCard from '@/Components/BookCard';
import MainLayout from '@/Layouts/MainLayout';
import { Book } from '@/types/model';

export type Wishlist = {
    id: number;
    user_id: number;
    book_id: number;
    created_at: string;
    updated_at: string;
    book: Book;
};

const WishlistIndex = ({ wishlists }: { wishlists: Wishlist[] }) => {
    return (
        <MainLayout>
            <h1 className="mb-4 text-2xl font-bold">My Wishlist</h1>
            <div className="-mx-2 flex flex-wrap">
                {wishlists.map((wishlist) => (
                    <div
                        key={wishlist.id}
                        className="w-full p-2 md:w-1/2 lg:w-1/4"
                    >
                        <BookCard book={wishlist.book} />
                    </div>
                ))}
            </div>
        </MainLayout>
    );
};

export default WishlistIndex;
