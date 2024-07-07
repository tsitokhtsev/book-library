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
import { Form } from '@/Pages/Admin/Conditions/Partials/Form';
import { columns } from '@/Pages/Admin/Conditions/Partials/columns';
import { FormType } from '@/types/form';
import { Condition } from '@/types/model';

const initialData = {
    name: '',
};

export default function Index({ conditions }: { conditions: Condition[] }) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={t('Conditions')} />

            <Card className="flex flex-grow flex-col">
                <div className="flex flex-col justify-between sm:flex-row">
                    <CardHeader>
                        <CardTitle>{t('Conditions')}</CardTitle>
                        <CardDescription>
                            {t('View and manage conditions')}
                        </CardDescription>
                    </CardHeader>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="mx-6 mb-6 sm:m-6">
                                {t('Add Condition')}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>{t('Add condition')}</DialogTitle>
                                <DialogDescription>
                                    {t('Create and add a new condition')}
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
                        data={conditions}
                        columns={columns}
                        filterBy="name"
                    />
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
