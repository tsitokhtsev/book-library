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
import { Form } from '@/Pages/Admin/Members/Partials/Form';
import { FormType, MemberForm } from '@/types/form';

export default function Edit({
    member,
    member_id,
}: {
    member: MemberForm;
    member_id: number;
}) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={t('Edit Member')} />

            <Card className="flex flex-grow flex-col">
                <CardHeader>
                    <CardTitle>{t('Edit Member')}</CardTitle>
                    <CardDescription>
                        {t('Edit the member of the library')}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-grow flex-col">
                    <Form
                        type={FormType.Edit}
                        initialData={member}
                        memberId={member_id}
                    />
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
