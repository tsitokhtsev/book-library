import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { PropsWithChildren } from 'react';

import AdminLayout from '@/Layouts/AdminLayout';
import { cn } from '@/lib/utils';

const links = [
    { href: 'admin.configuration.index', label: 'Library' },
    { href: 'admin.branches.index', label: 'Branches' },
    { href: 'admin.authors.index', label: 'Authors' },
    { href: 'admin.genres.index', label: 'Genres' },
    { href: 'admin.statuses.index', label: 'Book statuses' },
    { href: 'admin.conditions.index', label: 'Book conditions' },
];

export default function Configuration({ children }: PropsWithChildren) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <h1 className="mb-4 text-3xl font-semibold md:mb-8">
                {t('Configuration')}
            </h1>

            <div className="flex flex-col items-start gap-6 md:flex-row">
                <nav className="grid flex-shrink-0 justify-items-start gap-4 md:w-48">
                    {links.map(({ href, label }) => (
                        <Link
                            key={label}
                            href={route(href)}
                            className={cn('text-sm text-muted-foreground', {
                                'font-semibold text-primary':
                                    route().current(href),
                            })}
                        >
                            {t(label)}
                        </Link>
                    ))}
                </nav>

                <div className="w-full min-w-0">{children}</div>
            </div>
        </AdminLayout>
    );
}
