import { Head, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import Multiselect from 'multiselect-react-dropdown';
import { FormEventHandler } from 'react';
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
import AdminLayout from '@/Layouts/AdminLayout';
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

type Book = {
    is_enabled: boolean;
    isbn: string;
    title: string;
    description: string;
    cover_image: string;
    language: { id: number; name: string };
    publication_date: string;
    book_copies: BookBranch[];
    genres: SelectOptionType[];
    authors: SelectOptionType[];
};

export default function Add({
    book,
    languages,
    genres,
    authors,
    branches,
    conditions,
    flash: { error },
}: {
    book: Book;
    languages: SelectOptionType;
    genres: SelectOptionType;
    authors: SelectOptionType;
    branches: SelectOptionType;
    conditions: SelectOptionType;
    flash: FlashType;
}) {
    const { t } = useLaravelReactI18n();

    const { data, setData, post, processing, errors, reset } = useForm({
        is_enabled: book.is_enabled,
        title: book.title,
        isbn: book.isbn,
        description: book.description,
        cover_image: book.cover_image,
        publication_date: book.publication_date,
        language: book.language.name,
        genres: book.genres,
        authors: book.authors,
        book_branches: book.book_copies || ([] as BookBranch[]),
    });

    const handleBookBranchChange = (
        index: number,
        field: keyof BookBranch,
        value: string,
    ) => {
        const newData = { ...data };
        newData.book_branches[index][field] = value;
        setData(newData);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.books.save'), {
            preserveScroll: true,
        });
    };

    const renderBookBranchFields = () => {
        return data.book_branches.map((branchesData, index) => (
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
                        value={branchesData.condition.name}
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
                        message={errors[`book_branches.${index}.condition`]}
                        className="mt-2"
                    />
                </div>
                <div>
                    <InputLabel htmlFor="branch" value="Select Book Branch" />
                    <Select
                        onValueChange={(value) => {
                            handleBookBranchChange(index, 'branch', value);
                        }}
                        value={branchesData.branch.name}
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
                                        is
                                    >
                                        {branch.name}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                    <InputError
                        message={errors[`book_branches.${index}.branch`]}
                        className="mt-2"
                    />
                </div>
                <div>
                    <InputLabel htmlFor="code" value="Code" />

                    <TextInput
                        id="code"
                        type="text"
                        name="code"
                        value={data.book_branches[index]?.code || ''}
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
                        message={errors[`book_branches.${index}.code`]}
                        className="mt-2"
                    />
                </div>
            </div>
        ));
    };

    return (
        <AdminLayout>
            <Head title={t('Add New Book')} />
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
                    <InputLabel
                        className="uppercase"
                        htmlFor="isbn"
                        value="Isbn"
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
                        value={data.language}
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
                    <InputLabel
                        htmlFor="description"
                        value="Select Book Genre"
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
                        value="Select Book Author"
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
        </AdminLayout>
    );
}
