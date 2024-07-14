import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { BookCard } from '@/Components/BookCard';
import { H3 } from '@/Components/Typography/H3';
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
    const { t } = useLaravelReactI18n();

    return (
        <MainLayout>
            <Head title={t('My Wishlist')} />

            <div className="container">
                <H3>{t('My Wishlist')}</H3>
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
            </div>
        </MainLayout>
    );
};

export default WishlistIndex;
