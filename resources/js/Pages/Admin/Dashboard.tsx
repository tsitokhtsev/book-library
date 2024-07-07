import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Button } from '@/Components/Button';
import { Card, CardHeader, CardTitle } from '@/Components/Card';
import AdminLayout from '@/Layouts/AdminLayout';
import Lend from '@/Pages/Admin/Dashboard/Partials/Lend';
import { LendData } from '@/types';

export default function Dashboard({ lend_data }: { lend_data: LendData }) {
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
                    </div>
                </div>
            </Card>
        </AdminLayout>
    );
}
