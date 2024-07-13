import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import AuthorCard from '@/Components/AuthorCard';
import BookCard from '@/Components/BookCard';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/Components/carousel';
import MainLayout from '@/Layouts/MainLayout';
import { Author, Book } from '@/types/model';

export default function Home({
    newBooks,
    authors,
}: {
    newBooks: Book[];
    authors: Author[];
}) {
    const { t } = useLaravelReactI18n();

    return (
        <MainLayout>
            <Head title={t('Home')} />
            <div className="container mx-auto px-4 pb-10">
                <Carousel>
                    <h1 className="mb-4 text-2xl font-bold">New Books</h1>
                    <CarouselContent>
                        {newBooks.map((book) => (
                            <CarouselItem
                                className="mb-6 md:basis-1/2 lg:basis-1/3"
                                key={book.id}
                            >
                                <BookCard book={book} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <Carousel className="mt-10">
                    <h1 className="mb-4 text-2xl font-bold">Authors</h1>
                    <CarouselContent>
                        {authors.map((author) => (
                            <CarouselItem
                                className="mb-6 md:basis-1/2 lg:basis-1/3"
                                key={author.id}
                            >
                                <AuthorCard author={author} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </MainLayout>
    );
}
