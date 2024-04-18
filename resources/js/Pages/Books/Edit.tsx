import AdminLayout from '@/Layouts/AdminLayout';
import BookForm, { BookData } from '@/Layouts/Partials/BookForm';
import { FlashType } from '@/utils/types';

import { FormType } from './Add';

type EditProps = {
    book: BookData;
    languages: { id: number; name: string }[];
    genres: { id: number; name: string }[];
    authors: { id: number; name: string }[];
    branches: { id: number; name: string }[];
    conditions: { id: number; name: string }[];
    flash: FlashType;
};

const Edit: React.FC<EditProps> = ({
    book,
    languages,
    genres,
    authors,
    branches,
    conditions,
    flash,
}) => {
    return (
        <AdminLayout>
            <BookForm
                initialValues={{
                    ...book,
                    publication_date: new Date(book.publication_date),
                }}
                languages={languages}
                genres={genres}
                authors={authors}
                branches={branches}
                conditions={conditions}
                flash={flash}
                type={FormType.EDIT}
            />
        </AdminLayout>
    );
};

export default Edit;
