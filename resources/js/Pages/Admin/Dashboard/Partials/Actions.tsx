import { useForm, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { TrashIcon } from 'lucide-react';
import { useEffect } from 'react';

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
import { useToast } from '@/Components/useToast';
import { PageProps } from '@/types';
import { Reservation } from '@/types/model';

export function Actions({ reservation }: { reservation: Reservation }) {
    const { t } = useLaravelReactI18n();
    const { toast } = useToast();
    const { success, error } = usePage<PageProps>().props.flash;
    const { post, delete: destroy, wasSuccessful } = useForm({});

    useEffect(() => {
        if (wasSuccessful) {
            toast({
                title: t(error || success),
                variant: error ? 'destructive' : 'default',
            });
        }
    }, [wasSuccessful]);

    const handleLend = () => {
        post(
            route('admin.checkout.store', {
                member_id: reservation.member.id,
                book_copies: [reservation.book_copy_id],
            }),
            {
                preserveScroll: true,
            },
        );
    };

    const handleDelete = () => {
        destroy(route('reservation.destroy', reservation.id), {
            preserveScroll: true,
        });
    };

    return (
        <div className="flex gap-2">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">{t('Lend')}</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('Lend a book')}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {t('Are you sure you want to lend this book?')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>{t('Cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLend}>
                            {t('Lend')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon">
                        <TrashIcon className="h-4 w-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {t('Delete reservation')}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {t(
                                'Are you sure you want to delete this reservation?',
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>{t('Cancel')}</AlertDialogCancel>
                        <AlertDialogAction
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            {t('Delete')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
