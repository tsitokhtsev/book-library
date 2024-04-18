// Edit component
import AdminLayout from '@/Layouts/AdminLayout';
import BookForm, { BookData } from '@/Layouts/Partials/BookForm';
import { FlashType } from '@/utils/types';

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
    const handleSubmit = (data: BookData) => {
        // Handle form submission for Edit operation
    };

    return (
        <AdminLayout>
            {/* Other layout components */}
            <BookForm
                initialValues={{
                    ...book,
                    publication_date: new Date(book.publication_date), // Convert publication_date to Date object
                }}
                languages={languages}
                genres={genres}
                authors={authors}
                branches={branches}
                conditions={conditions}
                flash={flash}
                onSubmit={handleSubmit}
            />
        </AdminLayout>
    );
};

export default Edit;
