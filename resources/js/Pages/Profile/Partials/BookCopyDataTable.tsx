'use client';

import { router, useForm } from '@inertiajs/react';
import {
    ColumnDef,
    RowData,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/table';
import { FlashType, SelectOption, SelectOptions } from '@/utils/types';
import { BookCopy } from '@/utils/types';

interface TableMeta<TData extends RowData> {
    conditions: SelectOptions;
    branches: SelectOptions;
    statuses: SelectOptions;
}

const data: BookCopy[] = [];

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
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="bg-green-300 text-right"
                                >
                                    Edit Book Copy
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit Book Copy</DialogTitle>
                                    <DialogDescription>
                                        Make changes to book copy here. Click
                                        save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex grid flex-col gap-4 py-4"
                                >
                                    <div>
                                        <InputLabel htmlFor="name">
                                            Code
                                        </InputLabel>
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
                                            value="Select Book Condition"
                                        />
                                        <Select
                                            onValueChange={(value) =>
                                                handleChange('condition', value)
                                            }
                                            value={data.condition.name}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select Book Cond..." />
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
                                            value="Select Book Status"
                                        />
                                        <Select
                                            onValueChange={(value) =>
                                                handleChange('status', value)
                                            }
                                            value={data.status.name}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select Book Status" />
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
                                            value="Select Book Branch"
                                        />
                                        <Select
                                            onValueChange={(value) =>
                                                handleChange('branch', value)
                                            }
                                            value={data.branch.name}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select Book Branch" />
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
                                        Save changes
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
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export function BookCopyDataTable({
    bookCopies,
    conditions,
    branches,
    statuses,
    flash,
}: {
    bookCopies: BookCopy[];
    conditions: SelectOptions;
    branches: SelectOptions;
    statuses: SelectOptions;
    flash: FlashType;
}) {
    const data = bookCopies;

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: {},
        meta: {
            conditions,
            branches,
            statuses,
        },
    });

    return (
        <div className="mt-2 w-full">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
