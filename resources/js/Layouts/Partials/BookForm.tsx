import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import Multiselect from 'multiselect-react-dropdown';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';

import { Button } from '@/Components/Button';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/select';
import {
    BookCopy,
    FlashType,
    SelectOption,
    SelectOptions,
} from '@/utils/types';
import { FormType } from '@/utils/types';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export type BookData = {
    is_enabled: boolean;
    title: string;
    isbn: string;
    description: string;
    cover_image: string;
    publication_date: string | Date;
    language: SelectOption;
    genres: SelectOptions;
    authors: SelectOptions;
    book_copies: BookCopy[];
};

interface BookFormProps {
    initialValues: BookData;
    languages: SelectOptions;
    genres: SelectOptions;
    authors: SelectOptions;
    branches: SelectOptions;
    statuses: SelectOptions;
    conditions: SelectOptions;
    flash: FlashType;
    type: FormType;
}

const BookForm: React.FC<BookFormProps> = ({
    initialValues,
    languages,
    genres,
    authors,
    branches,
    conditions,
    flash: { error },
    type,
    statuses,
}) => {
    const { t } = useLaravelReactI18n();

    const { data, setData, post, processing, errors } = useForm<BookData>({
        ...initialValues,
    });

    const handleBookBranchChange = (
        index: number,
        field: keyof BookCopy,
        value: string,
    ) => {
        const newData = { ...data };
        if (field === 'code') {
            newData.book_copies[index][field] = value;
        } else {
            newData.book_copies[index][field].name = value;
        }
        setData(newData);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (type === FormType.ADD) {
            post(route('admin.books.save'), {
                preserveState: true,
                preserveScroll: true,
            });
        } else {
            post(route('admin.books.edit'), {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const renderBookBranchFields = () => {
        return data.book_copies.map((bookCopy, index) => (
            <div key={index} className="flex flex-col gap-8">
                <h1 className="text-xl font-bold">
                    {t('Book Copy')} #{index + 1}
                </h1>
                <div>
                    <InputLabel htmlFor="code" value={t('Code')} />
                    <TextInput
                        id="code"
                        type="text"
                        name="code"
                        value={data.book_copies[index]?.code || ''}
                        className="mt-1 block w-full"
                        autoComplete="off"
                        onChange={(e) =>
                            handleBookBranchChange(
                                index,
                                'code',
                                e.target.value,
                            )
                        }
                    />
                    <InputError
                        message={errors[`book_copies.${index}.code`]}
                        className="mt-2"
                    />
                </div>
                <div>
                    <InputLabel
                        htmlFor="branch"
                        value={t('Select Book Condition')}
                    />
                    <Select
                        onValueChange={(value) => {
                            handleBookBranchChange(index, 'condition', value);
                        }}
                        value={bookCopy.condition.name}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={t('Book Condition')} />
                        </SelectTrigger>
                        <SelectContent>
                            {conditions.map((condition) => {
                                return (
                                    <SelectItem
                                        key={condition.id}
                                        value={condition.name}
                                    >
                                        {condition.name}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                    <InputError
                        message={errors[`book_copies.${index}.condition`]}
                        className="mt-2"
                    />
                </div>
                <div>
                    <InputLabel
                        htmlFor="branch"
                        value={t('Select Book Branch')}
                    />
                    <Select
                        onValueChange={(value) => {
                            handleBookBranchChange(index, 'branch', value);
                        }}
                        value={bookCopy.branch.name}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={t('Book Branch')} />
                        </SelectTrigger>
                        <SelectContent>
                            {branches.map((branch) => {
                                return (
                                    <SelectItem
                                        key={branch.id}
                                        value={branch.name}
                                    >
                                        {branch.name}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                    <InputError
                        message={errors[`book_copies.${index}.branch`]}
                        className="mt-2"
                    />
                </div>
                <div>
                    <InputLabel
                        htmlFor="branch"
                        value={t('Select Book Status')}
                    />
                    <Select
                        onValueChange={(value) => {
                            handleBookBranchChange(index, 'status', value);
                        }}
                        value={bookCopy.status.name}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={t('Book Status')} />
                        </SelectTrigger>
                        <SelectContent>
                            {statuses.map((status) => {
                                return (
                                    <SelectItem
                                        key={status.id}
                                        value={status.name}
                                    >
                                        {status.name}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                    <InputError
                        message={errors[`book_copies.${index}.status`]}
                        className="mt-2"
                    />
                </div>
            </div>
        ));
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div>
                <InputLabel htmlFor="title" value={t('Title')} />
                <TextInput
                    id="title"
                    type="text"
                    name="email"
                    value={data.title}
                    className="mt-1 block w-full"
                    autoComplete="off"
                    isFocused={true}
                    onChange={(e) => setData('title', e.target.value)}
                />
                <InputError message={errors.title} className="mt-2" />
            </div>
            <div>
                <InputLabel
                    className="uppercase"
                    htmlFor="isbn"
                    value={t('Isbn')}
                />
                <TextInput
                    id="isbn"
                    type="text"
                    name="isbn"
                    value={data.isbn}
                    className="mt-1 block w-full"
                    autoComplete="off"
                    onChange={(e) => setData('isbn', e.target.value)}
                />
                <InputError message={errors.isbn} className="mt-2" />
            </div>
            <div>
                <InputLabel htmlFor="description" value={t('Description')} />
                <TextInput
                    id="description"
                    type="text"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full"
                    autoComplete="off"
                    onChange={(e) => setData('description', e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>
            <div>
                <InputLabel
                    htmlFor="description"
                    value={t('Select Book Language')}
                />
                <Select
                    onValueChange={(value) => {
                        setData('language', { id: 0, name: value });
                    }}
                    value={data.language.name}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={t('Book Language')} />
                    </SelectTrigger>
                    <SelectContent>
                        {languages.map((language) => {
                            return (
                                <SelectItem
                                    key={language.id}
                                    value={language.name}
                                >
                                    {language.name}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
                <InputError message={errors.language} className="mt-2" />
            </div>
            <div>
                <InputLabel
                    htmlFor="publication_date"
                    value={t('Select Book Publication Date')}
                />
                <DatePicker
                    onChange={(value: Value) => {
                        if (value instanceof Date) {
                            setData('publication_date', value);
                        }
                    }}
                    className="bg-red"
                    value={data.publication_date}
                    name="publication_date"
                />
                <InputError
                    message={errors.publication_date}
                    className="mt-2"
                />
            </div>
            <div>
                <InputLabel
                    htmlFor="description"
                    value={t('Select Book Genres')}
                />
                <Multiselect
                    options={genres}
                    selectedValues={data.genres}
                    onSelect={(value) => {
                        setData('genres', value);
                    }}
                    onRemove={(value) => {
                        setData('genres', value);
                    }}
                    displayValue="name"
                />
                <InputError message={errors.genres} className="mt-2" />
            </div>
            <div>
                <InputLabel
                    htmlFor="description"
                    value={t('Select Book Authors')}
                />
                <Multiselect
                    options={authors}
                    selectedValues={data.authors}
                    onSelect={(value) => {
                        setData('authors', value);
                    }}
                    onRemove={(value) => {
                        setData('authors', value);
                    }}
                    displayValue="name"
                />
                <InputError message={errors.authors} className="mt-2" />
            </div>
            {renderBookBranchFields()}
            <div className="mt-4 flex items-center justify-start">
                <Button
                    onClick={() => {
                        setData('book_copies', [
                            ...data.book_copies,
                            {
                                code: '',
                                condition: { id: 0, name: '' },
                                branch: { id: 0, name: '' },
                                status: { id: 0, name: '' },
                            },
                        ]);
                    }}
                    className="ms-4"
                    type="button"
                >
                    {t('Add New Book Copy')}
                </Button>
            </div>
            <InputError
                message={error || errors.book_copies}
                className="text-l mt-2 font-bold"
            />
            <div className="mt-4 flex items-center justify-center">
                <Button className="ms-4" disabled={processing}>
                    {t('Submit')}
                </Button>
            </div>
        </form>
    );
};

export default BookForm;
