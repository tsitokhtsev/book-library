import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

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
            <div className="container">
                <Carousel>
                    <h1 className="text-2xl font-bold">New Books</h1>
                    <CarouselContent>
                        {newBooks.map((book) => (
                            <CarouselItem
                                className="md:basis-1/2 lg:basis-1/3"
                                key={book.id}
                            >
                                <div className="p-4">
                                    <h2 className="text-lg font-bold">
                                        {book.title}
                                    </h2>
                                    <p className="text-sm">
                                        {book.authors
                                            .map((author) => author.name)
                                            .join(', ')}
                                    </p>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <Carousel className="mt-10">
                    <h1 className="text-2xl font-bold">Authors</h1>
                    <CarouselContent>
                        {authors.map((authors) => (
                            <CarouselItem
                                className="md:basis-1/2 lg:basis-1/3"
                                key={authors.id}
                            >
                                <div className="p-4">
                                    <h2 className="text-lg font-bold">
                                        {authors.name}
                                    </h2>
                                </div>
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
