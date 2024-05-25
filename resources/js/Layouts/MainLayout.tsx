import { usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

import Header from '@/Layouts/Partials/Header';
import { PageProps } from '@/types';

export default function Main({ children }: PropsWithChildren) {
    const {
        auth: { user },
    } = usePage<PageProps>().props;

    return (
        <div className="flex min-h-screen flex-col">
            <Header user={user} />

            <main className="flex grow flex-col py-8">{children}</main>
        </div>
    );
}
