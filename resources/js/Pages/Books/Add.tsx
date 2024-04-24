import { Head } from '@inertiajs/react';

import AdminLayout from '@/Layouts/AdminLayout';
import BookForm from '@/Layouts/Partials/BookForm';
import { FlashType, FormType } from '@/utils/types';
import { SelectOptions } from '@/utils/types';

type AddProps = {
    languages: SelectOptions;
    genres: SelectOptions;
    authors: SelectOptions;
    branches: SelectOptions;
    conditions: SelectOptions;
    statuses: SelectOptions;
    flash: FlashType;
};

const Add: React.FC<AddProps> = ({
    languages,
    genres,
    authors,
    branches,
    conditions,
    flash,
    statuses,
}) => (
    <AdminLayout>
        <Head title="Edit Book" />
        <BookForm
            initialValues={{
                is_enabled: true,
                title: '',
                isbn: '',
                description: '',
                cover_image: '',
                publication_date: new Date(),
                language: { id: 0, name: '' },
                genres: [],
                authors: [],
                book_copies: [
                    {
                        code: '',
                        condition: { id: 0, name: '' },
                        branch: { id: 0, name: '' },
                        status: { id: 0, name: '' },
                    },
                ],
            }}
            languages={languages}
            genres={genres}
            authors={authors}
            branches={branches}
            conditions={conditions}
            flash={flash}
            type={FormType.ADD}
            statuses={statuses}
        />
    </AdminLayout>
);

export default Add;
