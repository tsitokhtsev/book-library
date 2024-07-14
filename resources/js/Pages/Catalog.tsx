import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import React, { useCallback, useEffect, useState } from 'react';

import BookCard from '@/Components/BookCard';
import SideMenu, { SelectedFilters } from '@/Components/SideMenu';
import MainLayout from '@/Layouts/MainLayout';
import { Author, Condition, Genre } from '@/types/model';

import { Pagination } from './Search/BooksList';

export type Categories = {
    authors: Author[];
    genres: Genre[];
    conditions: Condition[];
};

export interface CatalogProps extends InertiaPageProps {
    books: Pagination;
    categories: Categories;
}

const Catalog: React.FC<CatalogProps> = () => {
    const { t } = useLaravelReactI18n();
    const { books, categories, filters } = usePage<CatalogProps>().props;
    const { data, links } = books;

    const [filteredBooks, setFilteredBooks] = useState(data);

    const handleFilterChange = useCallback((filters: SelectedFilters) => {
        router.get('/catalog', filters, {
            preserveState: true,
            onSuccess: () => {
                setFilteredBooks(data);
            },
        });
    }, []);

    useEffect(() => {
        setFilteredBooks(data);
    }, [data]);

    return (
        <MainLayout>
            <Head title={t('Catalog')} />
            <div className="container flex">
                <div className="w-1/4">
                    <SideMenu
                        categories={categories}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                    />
                </div>

                <div className="w-3/4">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-center">
                            {links.map((link, index) => (
                                <Link
                                    key={index}
                                    disabled={!link.url}
                                    className={`mx-1 px-2 py-1 ${link.active ? 'font-bold' : 'text-gray-500'}`}
                                    href={link.url ? link.url : '#'}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Catalog;