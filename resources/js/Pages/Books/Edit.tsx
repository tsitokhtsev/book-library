import { Head } from '@inertiajs/react';

import AdminLayout from '@/Layouts/AdminLayout';
import BookForm, { BookData } from '@/Layouts/Partials/BookForm';
import { FormType, SelectOptions } from '@/utils/types';
import { FlashType } from '@/utils/types';

import { BookCopyDataTable } from '../Profile/Partials/BookCopyDataTable';

export type EditProps = {
    book: BookData;
    languages: SelectOptions;
    genres: SelectOptions;
    authors: SelectOptions;
    branches: SelectOptions;
    conditions: SelectOptions;
    statuses: SelectOptions;
    flash: FlashType;
};

const Edit: React.FC<EditProps> = ({
    book,
    languages,
    genres,
    authors,
    branches,
    conditions,
    statuses,
    flash,
}) => {
    return (
        <AdminLayout>
            <Head title="Add New Book" />
            <BookForm
                initialValues={{
                    ...book,
                    book_copies: [],
                    publication_date: new Date(book.publication_date),
                }}
                languages={languages}
                genres={genres}
                authors={authors}
                branches={branches}
                conditions={conditions}
                flash={flash}
                type={FormType.EDIT}
                statuses={statuses}
            />
            <h1 className="m-4 text-center text-xl">Book Copies</h1>
            <BookCopyDataTable
                bookCopies={book.book_copies}
                branches={branches}
                conditions={conditions}
                statuses={statuses}
                flash={flash}
            />
        </AdminLayout>
    );
};

export default Edit;
