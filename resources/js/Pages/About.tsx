import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Textarea } from '@/Components/Textarea';
import MainLayout from '@/Layouts/MainLayout';
import { Branch } from '@/types/model';

export default function About({
    about,
    branches,
}: {
    about: string;
    branches: Branch[];
}) {
    const { t } = useLaravelReactI18n();

    return (
        <MainLayout>
            <Head title={t('About Us')} />
            <div className="container p-4">
                <Textarea
                    readOnly
                    className="active:unset cursor-auto rounded bg-gray-300 p-3 text-base leading-relaxed text-gray-800"
                >
                    {about}
                </Textarea>
                <p className="mb-2 mt-4 text-lg font-semibold">
                    {t('Branches')}
                </p>
                <div className="flex flex-wrap items-center justify-between">
                    {branches.map((branch, index) => (
                        <div
                            key={index}
                            className="mt-2 rounded-lg bg-gray-100 p-4"
                        >
                            <p className="font-semibold">{branch.name}</p>
                            <p>{branch.address}</p>
                            <p>{branch.email}</p>
                            <p>{branch.phone}</p>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
