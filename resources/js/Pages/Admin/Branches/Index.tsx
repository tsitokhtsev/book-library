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
import ConfigurationLayout from '@/Layouts/ConfigurationLayout';
import { Form } from '@/Pages/Admin/Branches/Partials/Form';
import { columns } from '@/Pages/Admin/Branches/Partials/columns';
import { FormType } from '@/types/form';
import { Branch } from '@/types/model';

const initialData = {
    is_enabled: true,
    name: '',
    address: '',
    phone: '',
    email: '',
    working_hours: '',
};

export default function Index({ branches }: { branches: Branch[] }) {
    const { t } = useLaravelReactI18n();

    return (
        <ConfigurationLayout>
            <Head title={t('Branches')} />

            <Card>
                <div className="flex flex-col justify-between sm:flex-row">
                    <CardHeader>
                        <CardTitle>{t('Branches')}</CardTitle>
                        <CardDescription>
                            {t('View and manage branches')}
                        </CardDescription>
                    </CardHeader>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="mx-6 mb-6 sm:m-6">
                                {t('Add Branch')}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>{t('Add branch')}</DialogTitle>
                                <DialogDescription>
                                    {t('Create and add a new branch')}
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
                        data={branches}
                        columns={columns}
                        filterBy="name"
                    />
                </CardContent>
            </Card>
        </ConfigurationLayout>
    );
}
