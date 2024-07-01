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
import { Form } from '@/Pages/Admin/Authors/Partials/Form';
import { FormType } from '@/types/form';
import { Author } from '@/types/model';

export function Actions({ author }: { author: Author }) {
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
                        <DialogTitle>{t('Edit author')}</DialogTitle>
                        <DialogDescription>
                            {t('Make changes to the author and save.')}
                        </DialogDescription>
                    </DialogHeader>

                    <Form
                        type={FormType.Edit}
                        initialData={author}
                        authorId={author.id}
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
                            {t('Delete author')}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {author.books_count
                                ? t(
                                      'This author has :count books associated with them. This action is not available until you delete all the books associated with this author.',
                                      { count: author.books_count },
                                  )
                                : t(
                                      'Are you sure you want to delete this author? This action cannot be undone.',
                                  )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>{t('Cancel')}</AlertDialogCancel>
                        {!author.books_count && (
                            <AlertDialogAction variant="destructive" asChild>
                                <Link
                                    href={route(
                                        'admin.authors.destroy',
                                        author.id,
                                    )}
                                    as="button"
                                    method="delete"
                                    preserveScroll
                                >
                                    {t('Delete')}
                                </Link>
                            </AlertDialogAction>
                        )}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </DropdownMenu>
    );
}
