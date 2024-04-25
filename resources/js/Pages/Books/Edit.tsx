import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import AdminLayout from '@/Layouts/AdminLayout';
import BookForm, { BookData } from '@/Layouts/Partials/BookForm';
import BookCopyDataTable from '@/Layouts/Partials/DataTables/BookCopyDataTable';
import { FormType, SelectOptions } from '@/utils/types';
import { FlashType } from '@/utils/types';

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
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={t('Edit Book')} />
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
            <h1 className="m-4 text-center text-xl">{t('Book Copies')}</h1>
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
