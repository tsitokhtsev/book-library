import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler } from 'react';

import { Button } from '@/Components/Button';
import { Input } from '@/Components/Input';
import { InputError } from '@/Components/InputError';
import { Label } from '@/Components/Label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/Select';
import { SelectOption } from '@/types';
import { BookCopyForm, FormType } from '@/types/form';

export function Form({
    type,
    initialData,
    bookCopyId,
    branches,
    statuses,
    conditions,
}: {
    type: FormType;
    initialData: BookCopyForm;
    bookCopyId?: number;
    branches: SelectOption[];
    statuses: SelectOption[];
    conditions: SelectOption[];
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, put, processing, errors } =
        useForm<BookCopyForm>(initialData);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        switch (type) {
            case FormType.Create:
                post(route('admin.books.store'));
                break;
            case FormType.Edit:
                put(route('admin.book-copies.update', bookCopyId), {
                    preserveScroll: true,
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid items-start gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="code">{t('Code')}</Label>
                    <Input
                        type="text"
                        value={data.code}
                        onChange={(e) => setData('code', e.target.value)}
                        id="code"
                    />
                    <InputError message={errors.code} />
                </div>

                <div>
                    <Label htmlFor="branch_id">{t('Branch')}</Label>
                    <Select
                        value={data.branch_id?.toString() || ''}
                        onValueChange={(value) => {
                            const branch = branches.find(
                                (branch) => branch.id === parseInt(value),
                            );
                            setData('branch_id', branch?.id || null);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('Select a branch')} />
                        </SelectTrigger>
                        <SelectContent>
                            {branches.map((branch) => (
                                <SelectItem
                                    key={branch.id}
                                    value={branch.id.toString()}
                                >
                                    {branch.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.branch_id} />
                </div>

                <div>
                    <Label htmlFor="status_id">{t('Status')}</Label>
                    <Select
                        value={data.status_id?.toString() || ''}
                        onValueChange={(value) => {
                            const status = statuses.find(
                                (status) => status.id === parseInt(value),
                            );
                            setData('status_id', status?.id || null);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('Select a status')} />
                        </SelectTrigger>
                        <SelectContent>
                            {statuses.map((status) => (
                                <SelectItem
                                    key={status.id}
                                    value={status.id.toString()}
                                >
                                    {status.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.status_id} />
                </div>

                <div>
                    <Label htmlFor="condition_id">{t('Condition')}</Label>
                    <Select
                        value={data.condition_id?.toString() || ''}
                        onValueChange={(value) => {
                            const condition = conditions.find(
                                (condition) => condition.id === parseInt(value),
                            );
                            setData('condition_id', condition?.id || null);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('Select a branch')} />
                        </SelectTrigger>
                        <SelectContent>
                            {conditions.map((condition) => (
                                <SelectItem
                                    key={condition.id}
                                    value={condition.id.toString()}
                                >
                                    {condition.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.condition_id} />
                </div>
            </div>

            <div className="flex justify-between">
                <Button
                    type="submit"
                    disabled={processing}
                    className={type === FormType.Edit ? 'w-full' : ''}
                >
                    {t(submitButtonText)}
                </Button>
            </div>
        </form>
    );
}
