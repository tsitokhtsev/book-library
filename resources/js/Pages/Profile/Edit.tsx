import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import ProfileLayout from '@/Layouts/ProfileLayout';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm';
import { PageProps } from '@/types';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const { t } = useLaravelReactI18n();

    return (
        <ProfileLayout>
            <Head title={t('Profile')} />

            <UpdateProfileInformationForm
                mustVerifyEmail={mustVerifyEmail}
                status={status}
            />
            <UpdatePasswordForm />
            <DeleteUserForm />
        </ProfileLayout>
    );
}
