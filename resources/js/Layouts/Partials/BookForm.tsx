import { router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import Multiselect from 'multiselect-react-dropdown';
import { useEffect } from 'react';
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
import { FormType } from '@/Pages/Books/Add';
import { FlashType } from '@/utils/types';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type SelectOption = {
    id: number;
    name: string;
};

type SelectOptions = SelectOption[];

type BookBranch = {
    condition: string | SelectOption;
    branch: string | SelectOption;
    code: string;
};

export type BookData = {
    is_enabled: boolean;
    title: string;
    isbn: string;
    description: string;
    cover_image: string;
    publication_date: string | Date;
    language: string | SelectOption;
    genres: SelectOptions;
    authors: SelectOptions;
    book_copies: BookBranch[];
};

interface BookFormProps {
    initialValues: BookData;
    languages: SelectOptions;
    genres: SelectOptions;
    authors: SelectOptions;
    branches: SelectOptions;
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
        newData.book_copies[index][field] = value;
        setData(newData);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (type === FormType.ADD) {
            post(route('admin.books.save'), {
                preserveScroll: true,
            });
        } else {
            post(route('admin.books.edit'));
        }
    };

    const renderBookBranchFields = () => {
        return data.book_copies.map((bookCopy, index) => (
            <div key={index} className="flex flex-col gap-8">
                <h1 className="text-xl font-bold">
                    Book Instance #{index + 1}
                </h1>
                <div>
                    <InputLabel
                        htmlFor="branch"
                        value="Select Book Condition"
                    />
                    <Select
                        onValueChange={(value) => {
                            handleBookBranchChange(index, 'condition', value);
                        }}
                        value={
                            typeof bookCopy.condition === 'object'
                                ? bookCopy.condition.name
                                : undefined
                        }
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Book Cond..." />
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
                    <InputLabel htmlFor="branch" value="Select Book Branch" />
                    <Select
                        onValueChange={(value) => {
                            handleBookBranchChange(index, 'branch', value);
                        }}
                        value={
                            typeof bookCopy.branch === 'object'
                                ? bookCopy.branch.name
                                : undefined
                        }
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Book Branch" />
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
                    <InputLabel htmlFor="code" value="Code" />

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
            </div>
        ));
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-8">
            <div>
                <InputLabel htmlFor="title" value="Title" />

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
                <InputLabel className="uppercase" htmlFor="isbn" value="Isbn" />

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
                <InputLabel htmlFor="description" value="Description" />

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
                    value="Select Book Language"
                />
                <Select
                    onValueChange={(value) => {
                        setData('language', value);
                    }}
                    value={
                        typeof data.language === 'object'
                            ? data.language.name
                            : undefined
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select book language" />
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
                <DatePicker
                    onChange={(value: Value) => {
                        if (value instanceof Date) {
                            setData('publication_date', value);
                        }
                    }}
                    className="bg-red"
                    value={data.publication_date}
                />
                <InputError
                    message={errors.publication_date}
                    className="mt-2"
                />
            </div>
            <div>
                <InputLabel htmlFor="description" value="Select Book Genre" />
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
                <InputLabel htmlFor="description" value="Select Book Author" />
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
