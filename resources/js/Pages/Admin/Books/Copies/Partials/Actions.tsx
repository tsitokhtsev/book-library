import { Link } from '@inertiajs/react';
import { TableMeta } from '@tanstack/react-table';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { MoreHorizontalIcon } from 'lucide-react';
import { useState } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/Components/AlertDialog';
import { Button } from '@/Components/Button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/Components/Dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/DropdownMenu';
import { Form } from '@/Pages/Admin/Books/Copies/Partials/Form';
import { FormType } from '@/types/form';
import { BookCopy } from '@/types/model';

export function Actions({
    bookCopy,
    meta,
}: {
    bookCopy: BookCopy;
    meta: TableMeta<BookCopy>;
}) {
    const { t } = useLaravelReactI18n();

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">{t('Open actions')}</span>
                    <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                    {t('Edit')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                    {t('Delete')}
                </DropdownMenuItem>
            </DropdownMenuContent>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{t('Edit book copy')}</DialogTitle>
                        <DialogDescription>
                            {t('Make changes to the book copy and save.')}
                        </DialogDescription>
                    </DialogHeader>

                    <Form
                        type={FormType.Edit}
                        initialData={bookCopy}
                        bookId={bookCopy.book_id}
                        bookCopyId={bookCopy.id}
                        branches={meta.branches}
                        statuses={meta.statuses}
                        conditions={meta.conditions}
                    />
                </DialogContent>
            </Dialog>

            <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {t('Delete book copy')}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {t(
                                'Are you sure you want to delete this book copy? This action cannot be undone.',
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>{t('Cancel')}</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" asChild>
                            <Link
                                href={route(
                                    'admin.copies.destroy',
                                    bookCopy.id,
                                )}
                                as="button"
                                method="delete"
                                preserveScroll
                            >
                                {t('Delete')}
                            </Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </DropdownMenu>
    );
}
