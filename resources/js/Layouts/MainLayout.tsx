import { usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

import { Toaster } from '@/Components/Toaster';
import Header from '@/Layouts/Partials/Header';
import { PageProps } from '@/types';

export default function Main({ children }: PropsWithChildren) {
    const {
        auth: { user },
    } = usePage<PageProps>().props;

    return (
        <div className="flex min-h-screen flex-col">
            <Header user={user} />

            <main className="flex flex-grow flex-col gap-8 py-8">
                {children}
            </main>

            <Toaster />
        </div>
    );
}
