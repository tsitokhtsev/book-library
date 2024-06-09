import { Link } from '@inertiajs/react';
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
    AlertDialogTrigger,
} from '@/Components/AlertDialog';
import { Button } from '@/Components/Button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/DropdownMenu';
import { Book } from '@/types/model';

export default function Actions({ book }: { book: Book }) {
    const { t } = useLaravelReactI18n();

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
                <DropdownMenuItem asChild>
                    <Link href={route('admin.books.show', book.id)}>
                        {t('View')}
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={route('admin.books.edit', book.id)}>
                        {t('Edit')}
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                    {t('Delete')}
                </DropdownMenuItem>
            </DropdownMenuContent>

            <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <AlertDialogTrigger asChild>Delete</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {t('Delete member')}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {t(
                                'Are you sure you want to delete this book? This action cannot be undone.',
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>{t('Cancel')}</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" asChild>
                            <Link
                                href={route('admin.books.delete', book.id)}
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
