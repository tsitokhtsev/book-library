import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler } from 'react';

import { Button } from '@/Components/Button';
import { Input } from '@/Components/Input';
import { InputError } from '@/Components/InputError';
import { Label } from '@/Components/Label';
import { Textarea } from '@/Components/Textarea';
import { AuthorForm, FormType } from '@/types/form';

export function Form({
    type,
    initialData,
    authorId,
}: {
    type: FormType;
    initialData: AuthorForm;
    authorId?: number;
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, put, processing, errors } =
        useForm<AuthorForm>({
            ...initialData,
            cover_image: undefined,
        });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        switch (type) {
            case FormType.Create:
                post(route('admin.authors.store'), {
                    onSuccess: () => {
                        document.dispatchEvent(
                            new KeyboardEvent('keydown', { key: 'Escape' }),
                        );
                    },
                });
                break;
            case FormType.Edit:
                put(route('admin.authors.update', authorId), {
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData('cover_image', e.target.files[0]);
        }
    };

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

                <div className="grid gap-2">
                    <Label htmlFor="cover_image">Image</Label>
                    <Input
                        type="file"
                        name="image"
                        required={type === FormType.Edit ? false : true}
                        onChange={handleFileChange}
                    />
                    <InputError message={errors.cover_image} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="bio">{t('Bio')}</Label>
                    <Textarea
                        value={data.bio || ''}
                        onChange={(e) => setData('bio', e.target.value)}
                        id="bio"
                        className="resize-none"
                    />
                    <InputError message={errors.bio} />
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
