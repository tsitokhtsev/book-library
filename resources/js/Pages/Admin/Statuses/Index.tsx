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
import ConfigurationLayout from '@/Layouts/ConfigurationLayout';
import { Form } from '@/Pages/Admin/Statuses/Partials/Form';
import { columns } from '@/Pages/Admin/Statuses/Partials/columns';
import { FormType } from '@/types/form';
import { Status } from '@/types/model';

const initialData = {
    name: '',
};

export default function Index({ statuses }: { statuses: Status[] }) {
    const { t } = useLaravelReactI18n();

    return (
        <ConfigurationLayout>
            <Head title={t('Statuses')} />

            <Card>
                <div className="flex flex-col justify-between sm:flex-row">
                    <CardHeader>
                        <CardTitle>{t('Book Statuses')}</CardTitle>
                        <CardDescription>
                            {t('View and manage book statuses')}
                        </CardDescription>
                    </CardHeader>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="mx-6 mb-6 sm:m-6">
                                {t('Add Status')}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>{t('Add status')}</DialogTitle>
                                <DialogDescription>
                                    {t('Create and add a new status')}
                                </DialogDescription>
                            </DialogHeader>

                            <Form
                                type={FormType.Create}
                                initialData={initialData}
                            />
                        </DialogContent>
                    </Dialog>
                </div>

                <CardContent>
                    <DataTable
                        data={statuses}
                        columns={columns}
                        filterBy="name"
                    />
                </CardContent>
            </Card>
        </ConfigurationLayout>
    );
}
