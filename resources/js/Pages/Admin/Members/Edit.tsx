import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/Card';
import AdminLayout from '@/Layouts/AdminLayout';
import Form from '@/Pages/Admin/Members/Partials/Form';
import { Member } from '@/types';

export default function Edit({ member }: { member: Member }) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={t('Edit Member')} />

            <Card>
                <CardHeader>
                    <CardTitle>{t('Edit Member')}</CardTitle>
                    <CardDescription>
                        {t('Edit the member of the library')}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form
                        type="edit"
                        initialData={member}
                        memberId={member.id}
                    />
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
