import { Link, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { PropsWithChildren } from 'react';

import { Alert, AlertTitle } from '@/Components/Alert';
import { Tabs, TabsList, TabsTrigger } from '@/Components/Tabs';
import MainLayout from '@/Layouts/MainLayout';
import { PageProps } from '@/types';

export default function Admin({ children }: PropsWithChildren) {
    const {
        flash: { success, error },
    } = usePage<PageProps>().props;
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
                    <TabsTrigger
                        value="members"
                        active={route().current('admin.members.*')}
                        asChild
                    >
                        <Link href={route('admin.members.index')}>
                            {t('Members')}
                        </Link>
                    </TabsTrigger>
                    <TabsTrigger
                        value="books"
                        active={route().current('admin.books.*')}
                        asChild
                    >
                        <Link href={route('admin.books.index')}>
                            {t('Books')}
                        </Link>
                    </TabsTrigger>
                    <TabsTrigger value="configuration" asChild>
                        <Link href="">{t('Configuration')}</Link>
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            {(success || error) && (
                <div className="container">
                    <Alert variant={error ? 'destructive' : 'success'}>
                        <AlertTitle>{t(success || error)}</AlertTitle>
                    </Alert>
                </div>
            )}

            <div className="container flex flex-grow flex-col">{children}</div>
        </MainLayout>
    );
}
