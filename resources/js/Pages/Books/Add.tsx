import AdminLayout from '@/Layouts/AdminLayout';
import BookForm, { BookData } from '@/Layouts/Partials/BookForm';
import { FlashType } from '@/utils/types';

type AddProps = {
    languages: { id: number; name: string }[];
    genres: { id: number; name: string }[];
    authors: { id: number; name: string }[];
    branches: { id: number; name: string }[];
    conditions: { id: number; name: string }[];
    flash: FlashType;
};

export enum FormType {
    ADD,
    EDIT,
}

const Add: React.FC<AddProps> = ({
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
                    is_enabled: true,
                    title: '',
                    isbn: '',
                    description: '',
                    cover_image: '',
                    publication_date: new Date(),
                    language: '',
                    genres: [],
                    authors: [],
                    book_copies: [{ condition: '', branch: '', code: '' }],
                }}
                languages={languages}
                genres={genres}
                authors={authors}
                branches={branches}
                conditions={conditions}
                flash={flash}
                type={FormType.ADD}
            />
        </AdminLayout>
    );
};

export default Add;
