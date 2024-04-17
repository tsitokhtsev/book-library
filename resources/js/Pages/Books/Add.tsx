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

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Add({
    languages,
    genres,
    authors,
}: {
    languages: { id: number; name: string }[];
    genres: { id: number; name: string }[];
    authors: { id: number; name: string }[];
}) {
    const { t } = useLaravelReactI18n();

    const { data, setData, post, processing, errors, reset } = useForm({
        is_enabled: true,
        title: '',
        isbn: '',
        description: '',
        cover_image: '',
        publication_date: new Date(),
        language: '',
        genres: [],
        authors: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        reset();
        post(route('admin.books.save'));
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
                <div className="mt-4 flex items-center justify-end">
                    <Button className="ms-4" disabled={processing}>
                        Add
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
