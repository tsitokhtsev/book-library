import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import AdminLayout from '@/Layouts/AdminLayout';

export default function Dashboard() {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="container">
                <p>{t('Dashboard')}</p>
            </div>
        </AdminLayout>
    );
}
