import { router, useForm } from '@inertiajs/react';
import { ColumnDef, RowData } from '@tanstack/react-table';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/Components/Button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/DropdownMenu';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/dialog';
import { Input } from '@/Components/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/select';
import { SelectOption, SelectOptions } from '@/utils/types';
import { BookCopy } from '@/utils/types';

interface TableMeta<TData extends RowData> {
    conditions: SelectOptions;
    branches: SelectOptions;
    statuses: SelectOptions;
}

export const columns: ColumnDef<BookCopy>[] = [
    {
        accessorKey: 'code',
        header: 'Code',
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue('code')}</div>
        ),
    },
    {
        accessorKey: 'condition',
        header: 'Condition',
        cell: ({ row }) => (
            <div className="capitalize">
                {row.getValue<SelectOption>('condition').name}
            </div>
        ),
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
            <div className="capitalize">
                {row.getValue<SelectOption>('status').name}
            </div>
        ),
    },
    {
        accessorKey: 'branch',
        header: 'Branch',
        cell: ({ row }) => (
            <div className="capitalize">
                {row.getValue<SelectOption>('branch').name}
            </div>
        ),
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: (props) => {
            const { t } = useLaravelReactI18n();

            const bookCopy = props.row.original;
            const { conditions, statuses, branches } = props.table.options
                .meta as TableMeta<BookCopy>;

            const { data, setData, post, processing, errors } =
                useForm<BookCopy>({
                    ...bookCopy,
                });

            const handleChange = (field: keyof BookCopy, value: string) => {
                if (field === 'code') {
                    setData('code', value);
                } else {
                    setData(field, { id: 0, name: value });
                }
            };

            const handleSubmit = (e: React.FormEvent) => {
                e.preventDefault();
                post(
                    route('admin.book.edit', {
                        code: bookCopy.code,
                    }),
                    {
                        preserveState: true,
                        preserveScroll: true,
                        onSuccess: () => {
                            document.dispatchEvent(
                                new KeyboardEvent('keydown', { key: 'Escape' }),
                            );
                        },
                    },
                );
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t('Actions')}</DropdownMenuLabel>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="bg-green-300 text-right"
                                >
                                    {t('Edit Book Copy')}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>
                                        {t('Edit Book Copy')}
                                    </DialogTitle>
                                    <DialogDescription>
                                        {t(
                                            'Make changes to book copy here. Click save when you are done.',
                                        )}
                                    </DialogDescription>
                                </DialogHeader>
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex grid flex-col gap-4 py-4"
                                >
                                    <div>
                                        <InputLabel
                                            htmlFor="name"
                                            value={t('Code')}
                                        />
                                        <Input
                                            onChange={(e) =>
                                                handleChange(
                                                    'code',
                                                    e.target.value,
                                                )
                                            }
                                            id="name"
                                            value={data.code}
                                            className="col-span-3"
                                        />
                                        <InputError
                                            message={errors.code}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="condition"
                                            value={t('Select Book Condition')}
                                        />
                                        <Select
                                            onValueChange={(value) =>
                                                handleChange('condition', value)
                                            }
                                            value={data.condition.name}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Book Condition" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {conditions.map((condition) => {
                                                    return (
                                                        <SelectItem
                                                            key={condition.id}
                                                            value={
                                                                condition.name
                                                            }
                                                        >
                                                            {condition.name}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.condition}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="status"
                                            value={t('Select Book Status')}
                                        />
                                        <Select
                                            onValueChange={(value) =>
                                                handleChange('status', value)
                                            }
                                            value={data.status.name}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Book Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {statuses.map((status) => {
                                                    return (
                                                        <SelectItem
                                                            key={status.id}
                                                            value={status.name}
                                                        >
                                                            {status.name}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.status}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="branch"
                                            value={t('Select Book Branch')}
                                        />
                                        <Select
                                            onValueChange={(value) =>
                                                handleChange('branch', value)
                                            }
                                            value={data.branch.name}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Book Branch" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {branches.map((branch) => {
                                                    return (
                                                        <SelectItem
                                                            key={branch.id}
                                                            value={branch.name}
                                                        >
                                                            {branch.name}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.branch}
                                            className="mt-2"
                                        />
                                    </div>
                                    <Button disabled={processing}>
                                        {t('Save Changes')}
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                router.post(
                                    route('admin.book.delete', {
                                        code: bookCopy.code,
                                    }),
                                );
                            }}
                            className="bg-red-300 hover:cursor-pointer"
                        >
                            {t('Delete')}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default columns;
