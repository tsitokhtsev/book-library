import { usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { PropsWithChildren } from 'react';

import { Alert, AlertTitle } from '@/Components/Alert';
import MainLayout from '@/Layouts/MainLayout';
import { PageProps } from '@/types';

export default function Admin({ children }: PropsWithChildren) {
    const {
        flash: { success, error },
    } = usePage<PageProps>().props;
    const { t } = useLaravelReactI18n();

    return (
        <MainLayout>
            {(success || error) && (
                <div className="container">
                    <Alert variant={error ? 'destructive' : 'success'}>
                        <AlertTitle>{t(success || error)}</AlertTitle>
                    </Alert>
                </div>
            )}
            {children}
        </MainLayout>
    );
}
