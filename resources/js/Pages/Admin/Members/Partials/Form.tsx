import { Link, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler } from 'react';

import { Button } from '@/Components/Button';
import { Input } from '@/Components/Input';
import { InputError } from '@/Components/InputError';
import { Label } from '@/Components/Label';
import { FormType, MemberForm } from '@/types/form';

export function Form({
    type,
    initialData,
    memberId,
}: {
    type: FormType;
    initialData: MemberForm;
    memberId?: number;
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, put, processing, errors } =
        useForm<MemberForm>(initialData);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        switch (type) {
            case FormType.Create:
                post(route('admin.members.store'));
                break;
            case FormType.Edit:
                put(route('admin.members.update', memberId));
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
            <div className="grid items-start gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="first_name">{t('First name')}</Label>
                    <Input
                        type="text"
                        value={data.first_name}
                        onChange={(e) => setData('first_name', e.target.value)}
                        id="first_name"
                    />
                    <InputError message={errors.first_name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="last_name">{t('Last name')}</Label>
                    <Input
                        type="text"
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                        id="last_name"
                    />
                    <InputError message={errors.last_name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">{t('Email')}</Label>
                    <Input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        id="email"
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="phone_number">{t('Phone number')}</Label>
                    <Input
                        type="tel"
                        value={data.phone_number}
                        onChange={(e) =>
                            setData('phone_number', e.target.value)
                        }
                        id="phone_number"
                    />
                    <InputError message={errors.phone_number} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="personal_number">
                        {t('Personal number')}
                    </Label>
                    <Input
                        type="text"
                        value={data.personal_number}
                        onChange={(e) =>
                            setData('personal_number', e.target.value)
                        }
                        id="personal_number"
                    />
                    <InputError message={errors.personal_number} />
                </div>
            </div>

            <div className="flex flex-grow items-end justify-between">
                <Button variant="ghost" asChild>
                    <Link href={route('admin.members.index')}>{t('Back')}</Link>
                </Button>
                <Button type="submit" disabled={processing}>
                    {t(submitButtonText)}
                </Button>
            </div>
        </form>
    );
}
