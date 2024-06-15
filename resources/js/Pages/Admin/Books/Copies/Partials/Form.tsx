import { Link, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { PlusCircleIcon, TrashIcon } from 'lucide-react';
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
import { H4 } from '@/Components/Typography/H4';
import { SelectOption } from '@/types';
import { BookCopyForm, FormType } from '@/types/form';

export function Form({
    type,
    initialData,
    bookId,
    bookCopyId,
    branches,
    statuses,
    conditions,
}: {
    type: FormType;
    initialData: BookCopyForm;
    bookId: number;
    bookCopyId?: number;
    branches: SelectOption[];
    statuses: SelectOption[];
    conditions: SelectOption[];
}) {
    const { t } = useLaravelReactI18n();
    const singleForm = useForm<BookCopyForm>(initialData);
    const bulkForm = useForm<{ copies: BookCopyForm[] }>({
        copies: [initialData],
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        switch (type) {
            case FormType.Create:
                bulkForm.post(route('admin.books.copies.store', bookId));
                break;
            case FormType.Edit:
                singleForm.put(route('admin.copies.update', bookCopyId), {
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

    const renderSingleForm = () => {
        const { data, setData, errors } = singleForm;

        return (
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

                <div className="grid gap-2">
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

                <div className="grid gap-2">
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

                <div className="grid gap-2">
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
                            <SelectValue
                                placeholder={t('Select a condition')}
                            />
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
        );
    };

    const renderBulkForm = () => {
        const { data, setData, errors } = bulkForm;

        type ErrorKey = keyof typeof errors;

        const handleValueChange = (
            index: number,
            key: string,
            value: string | number | null,
        ) => {
            const copies = data.copies.map((copy, i) => {
                if (i === index) {
                    return {
                        ...copy,
                        [key]: value,
                    };
                }

                return copy;
            });

            setData('copies', copies);
        };

        const handleRemoveCopy = (index: number) => {
            const copies = data.copies.filter((_, i) => i !== index);
            setData('copies', copies);
        };

        return data.copies.map((bookCopy, index) => (
            <div key={index} className="grid items-start gap-4 sm:grid-cols-2">
                <H4 className="my-0 sm:col-span-2">
                    {t('Copy')} #{index + 1}
                    {index > 0 && (
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => handleRemoveCopy(index)}
                            className="ml-4"
                        >
                            <TrashIcon className="h-4 w-4" />
                        </Button>
                    )}
                </H4>

                <div className="grid gap-2">
                    <Label htmlFor="code">{t('Code')}</Label>
                    <Input
                        type="text"
                        value={bookCopy.code}
                        onChange={(e) =>
                            handleValueChange(index, 'code', e.target.value)
                        }
                        id="code"
                    />
                    <InputError
                        message={errors[`copies.${index}.code` as ErrorKey]}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="branch_id">{t('Branch')}</Label>
                    <Select
                        value={bookCopy.branch_id?.toString() || ''}
                        onValueChange={(value) => {
                            const branch = branches.find(
                                (branch) => branch.id === parseInt(value),
                            );
                            handleValueChange(
                                index,
                                'branch_id',
                                branch?.id || null,
                            );
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
                    <InputError
                        message={
                            errors[`copies.${index}.branch_id` as ErrorKey]
                        }
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="status_id">{t('Status')}</Label>
                    <Select
                        value={bookCopy.status_id?.toString() || ''}
                        onValueChange={(value) => {
                            const status = statuses.find(
                                (status) => status.id === parseInt(value),
                            );
                            handleValueChange(
                                index,
                                'status_id',
                                status?.id || null,
                            );
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
                    <InputError
                        message={
                            errors[`copies.${index}.status_id` as ErrorKey]
                        }
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="condition_id">{t('Condition')}</Label>
                    <Select
                        value={bookCopy.condition_id?.toString() || ''}
                        onValueChange={(value) => {
                            const condition = conditions.find(
                                (condition) => condition.id === parseInt(value),
                            );
                            handleValueChange(
                                index,
                                'condition_id',
                                condition?.id || null,
                            );
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue
                                placeholder={t('Select a condition')}
                            />
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
                    <InputError
                        message={
                            errors[`copies.${index}.condition_id` as ErrorKey]
                        }
                    />
                </div>
            </div>
        ));
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-grow flex-col gap-6">
            {type === FormType.Create ? (
                <>
                    {renderBulkForm()}
                    <div className="flex justify-center">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                bulkForm.setData('copies', [
                                    ...bulkForm.data.copies,
                                    initialData,
                                ]);
                            }}
                        >
                            <PlusCircleIcon className="mr-2 h-4 w-4" />
                            {t('Add another copy')}
                        </Button>
                    </div>
                </>
            ) : (
                renderSingleForm()
            )}

            <div className="flex flex-grow items-end justify-between">
                {type === FormType.Create && (
                    <Button variant="ghost" asChild>
                        <Link href={route('admin.books.show', bookId)}>
                            {t('Back')}
                        </Link>
                    </Button>
                )}

                <Button
                    type="submit"
                    disabled={singleForm.processing || bulkForm.processing}
                    className={type === FormType.Edit ? 'w-full' : ''}
                >
                    {t(submitButtonText)}
                </Button>
            </div>
        </form>
    );
}
