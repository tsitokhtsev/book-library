import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import MainLayout from '@/Layouts/MainLayout';

export default function Home() {
    const { t } = useLaravelReactI18n();

    return (
        <MainLayout>
            <Head title={t('Home')} />
        </MainLayout>
    );
}
