import { Head, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler } from 'react';

import { Button } from '@/Components/Button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/Card';
import { Input } from '@/Components/Input';
import { InputError } from '@/Components/InputError';
import { Label } from '@/Components/Label';
import AdminLayout from '@/Layouts/AdminLayout';
import { MemberForm } from '@/types';

export default function Create() {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, processing, errors } = useForm<MemberForm>({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        personal_number: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.members.store'));
    };

    return (
        <AdminLayout>
            <Head title={t('Add Member')} />

            <Card>
                <CardHeader className="flex-row justify-between space-y-0">
                    <div>
                        <CardTitle>{t('Add Member')}</CardTitle>
                        <CardDescription>
                            {t('Add a new member to the library')}
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-6"
                    >
                        <div className="grid items-start gap-4 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="first_name">
                                    {t('First name')}
                                </Label>
                                <Input
                                    type="text"
                                    value={data.first_name}
                                    onChange={(e) =>
                                        setData('first_name', e.target.value)
                                    }
                                    id="first_name"
                                />
                                <InputError message={errors.first_name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="last_name">
                                    {t('Last name')}
                                </Label>
                                <Input
                                    type="text"
                                    value={data.last_name}
                                    onChange={(e) =>
                                        setData('last_name', e.target.value)
                                    }
                                    id="last_name"
                                />
                                <InputError message={errors.last_name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">{t('Email')}</Label>
                                <Input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    id="email"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phone_number">
                                    {t('Phone number')}
                                </Label>
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
                                        setData(
                                            'personal_number',
                                            e.target.value,
                                        )
                                    }
                                    id="personal_number"
                                />
                                <InputError message={errors.personal_number} />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={processing}
                            className="self-end"
                        >
                            {t('Add')}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
