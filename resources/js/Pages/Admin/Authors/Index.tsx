import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Button } from '@/Components/Button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/Card';
import { DataTable } from '@/Components/DataTable';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/Dialog';
import AdminLayout from '@/Layouts/AdminLayout';
import { Form } from '@/Pages/Admin/Authors/Partials/Form';
import { columns } from '@/Pages/Admin/Authors/Partials/columns';
import { FormType } from '@/types/form';
import { Author } from '@/types/model';

const initialData = {
    name: '',
    bio: '',
};

export default function Index({ authors }: { authors: Author[] }) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={t('Authors')} />

            <Card className="flex flex-grow flex-col">
                <div className="flex flex-col justify-between sm:flex-row">
                    <CardHeader>
                        <CardTitle>{t('Authors')}</CardTitle>
                        <CardDescription>
                            {t('View and manage authors')}
                        </CardDescription>
                    </CardHeader>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="mx-6 mb-6 sm:m-6">
                                {t('Add Author')}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>{t('Add author')}</DialogTitle>
                                <DialogDescription>
                                    {t('Create and add a new author')}
                                </DialogDescription>
                            </DialogHeader>

                            <Form
                                type={FormType.Create}
                                initialData={initialData}
                            />
                        </DialogContent>
                    </Dialog>
                </div>

                <CardContent className="flex flex-grow flex-col">
                    <DataTable
                        data={authors}
                        columns={columns}
                        filterBy="name"
                    />
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
