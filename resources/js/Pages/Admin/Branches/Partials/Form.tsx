import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler } from 'react';

import { Badge } from '@/Components/Badge';
import { Button } from '@/Components/Button';
import { Checkbox } from '@/Components/Checkbox';
import { Input } from '@/Components/Input';
import { InputError } from '@/Components/InputError';
import { Label } from '@/Components/Label';
import { BranchForm, FormType } from '@/types/form';

export function Form({
    type,
    initialData,
    branchId,
}: {
    type: FormType;
    initialData: BranchForm;
    branchId?: number;
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, put, processing, errors } =
        useForm<BranchForm>(initialData);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        switch (type) {
            case FormType.Create:
                post(route('admin.branches.store'), {
                    onSuccess: () => {
                        document.dispatchEvent(
                            new KeyboardEvent('keydown', { key: 'Escape' }),
                        );
                    },
                });
                break;
            case FormType.Edit:
                put(route('admin.branches.update', branchId), {
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
                    <Label htmlFor="is_enabled">{t('Enabled')}</Label>
                    <Checkbox
                        checked={data.is_enabled}
                        onCheckedChange={(value) =>
                            setData('is_enabled', !!value)
                        }
                    />
                    <InputError message={errors.is_enabled} />
                </div>
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
                    <Label htmlFor="address">{t('Address')}</Label>
                    <Input
                        type="text"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        id="address"
                    />
                    <InputError message={errors.address} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">{t('Phone')}</Label>
                    <Input
                        type="text"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        id="phone"
                    />
                    <InputError message={errors.phone} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">{t('Email')}</Label>
                    <Input
                        type="text"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        id="email"
                    />
                    <InputError message={errors.email} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="working_hours">{t('Working hours')}</Label>
                    <Input
                        type="text"
                        value={data.working_hours}
                        onChange={(e) =>
                            setData('working_hours', e.target.value)
                        }
                        id="working_hours"
                    />
                    <InputError message={errors.working_hours} />
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
