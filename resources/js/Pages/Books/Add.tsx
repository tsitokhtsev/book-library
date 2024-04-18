// Add component
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

const Add: React.FC<AddProps> = ({
    languages,
    genres,
    authors,
    branches,
    conditions,
    flash,
}) => {
    const handleSubmit = (data: BookData) => {
        // Handle form submission for Add operation
    };

    return (
        <AdminLayout>
            {/* Other layout components */}
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
                    book_branches: [{ condition: '', branch: '', code: '' }],
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

export default Add;
