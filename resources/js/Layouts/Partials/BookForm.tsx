import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';

import { Button } from '@/Components/Button';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/select';
import { FlashType } from '@/utils/types';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type SelectOptionType = {
    id: number;
    name: string;
}[];

type BookBranch = {
    condition: string;
    branch: string;
    code: string;
};

export type BookData = {
    is_enabled: boolean;
    title: string;
    isbn: string;
    description: string;
    cover_image: string;
    publication_date: string | Date;
    language: string;
    genres: SelectOptionType;
    authors: SelectOptionType;
    book_branches: BookBranch[];
};

interface BookFormProps {
    initialValues: BookData;
    languages: SelectOptionType;
    genres: SelectOptionType;
    authors: SelectOptionType;
    branches: SelectOptionType;
    conditions: SelectOptionType;
    flash: FlashType;
    onSubmit: (data: BookData) => void;
}

const BookForm: React.FC<BookFormProps> = ({
    initialValues,
    languages,
    genres,
    authors,
    branches,
    conditions,
    flash: { error },
    onSubmit,
}) => {
    const { t } = useLaravelReactI18n();

    const { data, setData, post, processing, errors, reset } =
        useForm<BookData>({
            ...initialValues,
        });

    useEffect(() => {
        setData(initialValues);
    }, [initialValues]);

    const handleBookBranchChange = (
        index: number,
        field: keyof BookBranch,
        value: string,
    ) => {
        const newData = { ...data };
        newData.book_branches[index][field] = value;
        setData(newData);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(data);
    };

    const renderBookBranchFields = () => {
        return data.book_branches.map((_, index) => (
            <div key={index} className="flex flex-col gap-8">
                {/* Render book branch fields */}
            </div>
        ));
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-8">
            {/* Render common input fields */}
            {/* Render language select */}
            {/* Render date picker */}
            {/* Render genre multiselect */}
            {/* Render author multiselect */}
            {renderBookBranchFields()}
            <div className="mt-4 flex items-center justify-start">
                <Button
                    onClick={() => {
                        setData('book_branches', [
                            ...data.book_branches,
                            { code: '', condition: '', branch: '' },
                        ]);
                    }}
                    className="ms-4"
                    type="button"
                >
                    Add New Book Instance
                </Button>
            </div>
            <InputError message={error} className="text-l mt-2 font-bold" />
            <div className="mt-4 flex items-center justify-center">
                <Button className="ms-4" disabled={processing}>
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default BookForm;
