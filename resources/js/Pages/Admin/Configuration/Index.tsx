import { Head, Link, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Button } from '@/Components/Button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/Card';
import { Input } from '@/Components/Input';
import { InputError } from '@/Components/InputError';
import { Label } from '@/Components/Label';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/Components/NavigationMenu';
import AdminLayout from '@/Layouts/AdminLayout';

type Configurations = {
    days_to_return: number;
    max_lent_books: number;
};

export default function Index({
    days_to_return,
    max_lent_books,
}: Configurations) {
    const { t } = useLaravelReactI18n();
    const { data, setData, put, processing, errors } = useForm<Configurations>({
        days_to_return,
        max_lent_books,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        put(route('admin.configuration.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Configuration" />

            <NavigationMenu className="hidden sm:flex">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            asChild
                            className={navigationMenuTriggerStyle()}
                        >
                            <Link href={route('admin.authors')}>
                                {t('Authors')}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            asChild
                            className={navigationMenuTriggerStyle()}
                        >
                            <Link href={route('admin.genres')}>
                                {t('Genres')}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            asChild
                            className={navigationMenuTriggerStyle()}
                        >
                            <Link href={route('admin.conditions')}>
                                {t('Conditions')}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            asChild
                            className={navigationMenuTriggerStyle()}
                        >
                            <Link href={route('admin.statuses')}>
                                {t('Statuses')}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            asChild
                            className={navigationMenuTriggerStyle()}
                        >
                            <Link href={route('admin.branches')}>
                                {t('Branches')}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <h1 className="mb-4 text-3xl font-semibold md:mb-8">
                {t('Configuration')}
            </h1>

            <div className="grid gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <nav className="grid gap-4 text-sm text-muted-foreground">
                    <Link href="#" className="font-semibold text-primary">
                        {t('Library')}
                    </Link>
                </nav>

                <form onSubmit={handleSubmit}>
                    <Card className="flex flex-grow flex-col">
                        <CardHeader>
                            <CardTitle>{t('Library')}</CardTitle>
                            <CardDescription>
                                {t("Configure library's policies and settings")}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="days_to_return">
                                    {t('Days to Return')}
                                </Label>

                                <Input
                                    type="number"
                                    value={data.days_to_return}
                                    onChange={(e) =>
                                        setData(
                                            'days_to_return',
                                            parseInt(e.target.value) || 1,
                                        )
                                    }
                                    id="days_to_return"
                                    min="1"
                                />

                                <span className="text-xs text-muted-foreground">
                                    {t(
                                        'The number of days a member has to return a book.',
                                    )}
                                </span>

                                <InputError message={errors.days_to_return} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="max_lent_books">
                                    {t('Max Lent Books')}
                                </Label>

                                <Input
                                    type="number"
                                    value={data.max_lent_books}
                                    onChange={(e) =>
                                        setData(
                                            'max_lent_books',
                                            parseInt(e.target.value) || 1,
                                        )
                                    }
                                    id="max_lent_books"
                                    min="1"
                                />

                                <span className="text-xs text-muted-foreground">
                                    {t(
                                        'The maximum number of books a member can borrow at the same time.',
                                    )}
                                </span>

                                <InputError message={errors.max_lent_books} />
                            </div>
                        </CardContent>

                        <CardFooter className="border-t px-6 py-4">
                            <Button type="submit" disabled={processing}>
                                {t('Save')}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AdminLayout>
    );
}
