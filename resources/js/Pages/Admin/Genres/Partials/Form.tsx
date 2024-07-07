import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler } from 'react';

import { Button } from '@/Components/Button';
import { Input } from '@/Components/Input';
import { InputError } from '@/Components/InputError';
import { Label } from '@/Components/Label';
import { Textarea } from '@/Components/Textarea';
import { FormType, GenreForm } from '@/types/form';

export function Form({
    type,
    initialData,
    genreId,
}: {
    type: FormType;
    initialData: GenreForm;
    genreId?: number;
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, put, processing, errors } =
        useForm<GenreForm>(initialData);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        switch (type) {
            case FormType.Create:
                post(route('admin.genres.store'), {
                    onSuccess: () => {
                        document.dispatchEvent(
                            new KeyboardEvent('keydown', { key: 'Escape' }),
                        );
                    },
                });
                break;
            case FormType.Edit:
                put(route('admin.genres.update', genreId), {
                    onSuccess: () => {
                        document.dispatchEvent(
                            new KeyboardEvent('keydown', { key: 'Escape' }),
                        );
                    },
                });
                break;
            default:
                break;
        }
    };

    const submitButtonText = {
        [FormType.Create]: 'Add',
        [FormType.Edit]: 'Save',
    }[type];

    return (
        <form onSubmit={handleSubmit} className="flex flex-grow flex-col gap-6">
            <div className="grid items-start gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">{t('Name')}</Label>
                    <Input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        id="name"
                    />
                    <InputError message={errors.name} />
                </div>
            </div>

            <div className="flex flex-grow items-end justify-between">
                <Button type="submit" disabled={processing} className="w-full">
                    {t(submitButtonText)}
                </Button>
            </div>
        </form>
    );
}
