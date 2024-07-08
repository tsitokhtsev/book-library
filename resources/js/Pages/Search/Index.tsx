import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Button } from '@/Components/Button';
import { Input } from '@/Components/Input';
import { InputError } from '@/Components/InputError';
import { Label } from '@/Components/Label';
import { MultiSelect } from '@/Components/MultiSelect';
import MainLayout from '@/Layouts/MainLayout';
import { SelectOption } from '@/types';
import { SearchForm } from '@/types/form';

const initialData = {
    genres: [],
    authors: [],
    title: '',
    statuses: [],
    languages: [],
    branches: [],
    conditions: [],
};

const Index = ({
    authors,
    genres,
    statuses,
    languages,
    branches,
    conditions,
}: {
    authors: SelectOption[];
    genres: SelectOption[];
    statuses: SelectOption[];
    languages: SelectOption[];
    branches: SelectOption[];
    conditions: SelectOption[];
}) => {
    const { t } = useLaravelReactI18n();

    const { data, setData, get, processing, errors } =
        useForm<SearchForm>(initialData);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        get(route('books.search'));
    };

    return (
        <MainLayout>
            <form
                onSubmit={handleSubmit}
                className="mx-auto flex w-9/12 flex-col gap-6"
            >
                <div className="grid items-start gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">{t('Title')}</Label>
                        <Input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            id="title"
                        />
                        <InputError message={errors.title} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="authors">{t('Authors')}</Label>
                        <MultiSelect
                            options={authors}
                            selectedOptions={data.authors}
                            onValueChange={(options) =>
                                setData('authors', options)
                            }
                        />
                        <InputError message={errors.authors} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="genres">{t('Genres')}</Label>
                        <MultiSelect
                            options={genres}
                            selectedOptions={data.genres}
                            onValueChange={(options) =>
                                setData('genres', options)
                            }
                        />
                        <InputError message={errors.genres} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="statuses">{t('Statuses')}</Label>
                        <MultiSelect
                            options={statuses}
                            selectedOptions={data.statuses}
                            onValueChange={(options) =>
                                setData('statuses', options)
                            }
                        />
                        <InputError message={errors.statuses} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="languages">{t('Languages')}</Label>
                        <MultiSelect
                            options={languages}
                            selectedOptions={data.languages}
                            onValueChange={(options) =>
                                setData('languages', options)
                            }
                        />
                        <InputError message={errors.languages} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="branches">{t('Branches')}</Label>
                        <MultiSelect
                            options={branches}
                            selectedOptions={data.branches}
                            onValueChange={(options) =>
                                setData('branches', options)
                            }
                        />
                        <InputError message={errors.branches} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="conditions">{t('Conditions')}</Label>
                        <MultiSelect
                            options={conditions}
                            selectedOptions={data.conditions}
                            onValueChange={(options) =>
                                setData('conditions', options)
                            }
                        />
                        <InputError message={errors.conditions} />
                    </div>
                </div>

                <div className="flex flex-grow items-end justify-between">
                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full"
                    >
                        {t('Search')}
                    </Button>
                </div>
            </form>
        </MainLayout>
    );
};

export default Index;
