import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import {
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/Components/NavigationMenu';

export function AdminNav({ mobile }: { mobile?: boolean }) {
    const { t } = useLaravelReactI18n();

    if (mobile) {
        return (
            <div className="flex flex-col gap-2 rounded-sm bg-muted p-4">
                <p className="font-bold">{t('Admin')}</p>
                <Link href={route('admin.dashboard')}>{t('Dashboard')}</Link>
                <Link href={route('admin.members.index')}>{t('Members')}</Link>
                <Link href={route('admin.books.index')}>{t('Books')}</Link>
                <Link href={route('admin.configuration.index')}>
                    {t('Configuration')}
                </Link>
            </div>
        );
    }

    return (
        <NavigationMenuItem>
            <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
                active={route().current('admin.*')}
            >
                <NavigationMenuTrigger>{t('Admin')}</NavigationMenuTrigger>
            </NavigationMenuLink>
            <NavigationMenuContent>
                <ul className="flex gap-2 p-4">
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            asChild
                            className={navigationMenuTriggerStyle()}
                            active={route().current('admin.dashboard')}
                        >
                            <Link href={route('admin.dashboard')}>
                                {t('Dashboard')}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            asChild
                            className={navigationMenuTriggerStyle()}
                            active={route().current('admin.members.*')}
                        >
                            <Link href={route('admin.members.index')}>
                                {t('Members')}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            asChild
                            className={navigationMenuTriggerStyle()}
                            active={route().current('admin.books.*')}
                        >
                            <Link href={route('admin.books.index')}>
                                {t('Books')}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            asChild
                            className={navigationMenuTriggerStyle()}
                            active={route().current('admin.configuration.*')}
                        >
                            <Link href={route('admin.configuration.index')}>
                                {t('Configuration')}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </ul>
            </NavigationMenuContent>
        </NavigationMenuItem>
    );
}
