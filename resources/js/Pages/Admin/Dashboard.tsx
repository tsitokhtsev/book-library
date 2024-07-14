import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Card, CardHeader, CardTitle } from '@/Components/Card';
import AdminLayout from '@/Layouts/AdminLayout';
import Lend from '@/Pages/Admin/Dashboard/Partials/Lend';
import Return from '@/Pages/Admin/Dashboard/Partials/Return';
import { LendData, ReturnData } from '@/types';

export default function Dashboard({
    lend_data,
    return_data,
}: {
    lend_data: LendData;
    return_data: ReturnData;
}) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <Card className="flex flex-grow flex-col">
                <div className="flex flex-col justify-between sm:flex-row">
                    <CardHeader>
                        <CardTitle>{t('Dashboard')}</CardTitle>
                    </CardHeader>

                    <div className="mx-6 mb-6 flex gap-2 sm:m-6 sm:flex-row">
                        <Lend data={lend_data} />
                        <Return data={return_data} />
                    </div>
                </div>
            </Card>
        </AdminLayout>
    );
}
