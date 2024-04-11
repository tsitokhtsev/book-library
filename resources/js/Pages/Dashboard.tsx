import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import MainLayout from '@/Layouts/MainLayout';

export default function Dashboard() {
    const { t } = useLaravelReactI18n();

    return (
        <MainLayout>
            <Head title="Dashboard" />

            <div className="container">
                <p>{t("You're logged in!")}</p>
            </div>
        </MainLayout>
    );
}
