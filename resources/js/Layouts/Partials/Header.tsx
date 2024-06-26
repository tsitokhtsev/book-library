import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { ChevronDownIcon, MenuIcon, XIcon } from 'lucide-react';

import ApplicationLogo from '@/Components/ApplicationLogo';
import { Avatar, AvatarFallback } from '@/Components/Avatar';
import { Button } from '@/Components/Button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
} from '@/Components/Drawer';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/DropdownMenu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/Components/NavigationMenu';
import { User } from '@/types/model';

export default function Header({ user }: { user?: User }) {
    const { getLocales, currentLocale, setLocale, t } = useLaravelReactI18n();

    function handleLocaleChange(locale: string) {
        setLocale(locale);
        localStorage.setItem('locale', locale);
    }

    function getLocaleLabel(locale: string) {
        switch (locale) {
            case 'en':
                return 'Eng';
            case 'ka':
                return 'Geo';
            default:
                return locale.charAt(0).toUpperCase() + locale.slice(1);
        }
    }

    return (
        <header className="border-b">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex gap-6">
                    <div className="flex items-center">
                        <Link href="/">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                        </Link>
                    </div>

                    <NavigationMenu className="hidden sm:flex">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    asChild
                                    className={navigationMenuTriggerStyle()}
                                >
                                    <Link href={route('home')}>
                                        {t('Home')}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            {user?.is_admin && (
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        asChild
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <Link href={route('admin.dashboard')}>
                                            {t('Dashboard')}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            )}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4">
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger>
                                <div className="inline-flex items-center gap-2">
                                    <span className="text-sm">
                                        {getLocaleLabel(currentLocale())}
                                    </span>
                                    <ChevronDownIcon size={14} />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {getLocales().map((locale) => (
                                    <DropdownMenuItem
                                        key={locale}
                                        onClick={() =>
                                            handleLocaleChange(locale)
                                        }
                                    >
                                        {getLocaleLabel(locale)}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Drawer>
                            <DrawerTrigger asChild className="sm:hidden">
                                <Button variant="outline" size="icon">
                                    <MenuIcon />
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent className="sm:hidden">
                                <DrawerHeader className="text-start">
                                    <div className="flex justify-end">
                                        <DrawerClose>
                                            <XIcon />
                                        </DrawerClose>
                                    </div>

                                    {user ? (
                                        <Link
                                            href={route('profile.edit')}
                                            className="flex flex-col items-center gap-2 justify-self-center"
                                        >
                                            <Avatar className="h-16 w-16">
                                                <AvatarFallback className="text-2xl">
                                                    {user.first_name[0]}
                                                    {user.last_name[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <p className="font-bold">
                                                {user.first_name}{' '}
                                                {user.last_name}
                                            </p>
                                        </Link>
                                    ) : null}

                                    <Link href={route('home')}>
                                        {t('Home')}
                                    </Link>
                                    {user ? (
                                        <Link href={route('profile.edit')}>
                                            {t('Profile')}
                                        </Link>
                                    ) : null}
                                </DrawerHeader>
                                <DrawerFooter className="border-t">
                                    {user ? (
                                        <DrawerClose asChild>
                                            <Button asChild>
                                                <Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                >
                                                    {t('Log Out')}
                                                </Link>
                                            </Button>
                                        </DrawerClose>
                                    ) : (
                                        <>
                                            <Button variant="outline" asChild>
                                                <Link href={route('login')}>
                                                    {t('Log in')}
                                                </Link>
                                            </Button>
                                            <Button asChild>
                                                <Link href={route('register')}>
                                                    {t('Register')}
                                                </Link>
                                            </Button>
                                        </>
                                    )}
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:gap-4">
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarFallback>
                                            {user.first_name[0]}
                                            {user.last_name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link href={route('profile.edit')}>
                                            {t('Profile')}
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="w-full"
                                        >
                                            {t('Log Out')}
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Button variant="outline" asChild>
                                    <Link href={route('login')}>
                                        {t('Log in')}
                                    </Link>
                                </Button>
                                <Button asChild>
                                    <Link href={route('register')}>
                                        {t('Register')}
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
