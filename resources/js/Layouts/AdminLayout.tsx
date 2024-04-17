import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { PropsWithChildren } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/Components/Tabs';
import MainLayout from '@/Layouts/MainLayout';

export default function Admin({ children }: PropsWithChildren) {
    const { t } = useLaravelReactI18n();

    return (
        <MainLayout>
            <Tabs className="container">
                <TabsList>
                    <TabsTrigger
                        value="dashboard"
                        active={route().current('admin.dashboard')}
                        asChild
                    >
                        <Link href={route('admin.dashboard')}>
                            {t('Dashboard')}
                        </Link>
                    </TabsTrigger>
                    <TabsTrigger value="members" asChild>
                        <Link href="">{t('Members')}</Link>
                    </TabsTrigger>
                    <TabsTrigger
                        value="books"
                        active={route().current('admin.books')}
                        asChild
                    >
                        <Link href={route('admin.books')}>{t('Books')}</Link>
                    </TabsTrigger>
                    <TabsTrigger value="configuration" asChild>
                        <Link href="">{t('Configuration')}</Link>
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="container mt-8">{children}</div>
        </MainLayout>
    );
}
