import { usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

import Header from '@/Layouts/Partials/Header';
import { PageProps } from '@/types';

export default function Main({ children }: PropsWithChildren) {
    const {
        auth: { user },
    } = usePage<PageProps>().props;

    return (
        <div className="min-h-screen">
            <Header user={user} />

            <main className="py-8">{children}</main>
        </div>
    );
}
