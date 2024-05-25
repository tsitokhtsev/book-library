import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Button } from '@/Components/Button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/Card';
import { DataTable } from '@/Components/DataTable';
import AdminLayout from '@/Layouts/AdminLayout';
import { columns } from '@/Pages/Admin/Members/Partials/columns';
import { Member } from '@/types';

export default function Index({ members }: { members: Member[] }) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={t('Members')} />

            <Card>
                <CardHeader className="flex-row justify-between space-y-0">
                    <div>
                        <CardTitle>{t('Members')}</CardTitle>
                        <CardDescription>
                            {t('View and manage members of the library')}
                        </CardDescription>
                    </div>

                    <Button asChild>
                        <Link href={route('admin.members.create')}>
                            {t('Add Member')}
                        </Link>
                    </Button>
                </CardHeader>

                <CardContent>
                    <DataTable columns={columns} data={members} />
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
