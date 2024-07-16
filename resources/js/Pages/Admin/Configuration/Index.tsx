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
import { Textarea } from '@/Components/Textarea';
import ConfigurationLayout from '@/Layouts/ConfigurationLayout';

type Configurations = {
    about: string;
    days_to_return: number;
    max_lent_books: number;
    max_reservation_days: number;
};

export default function Index({
    about,
    days_to_return,
    max_lent_books,
    max_reservation_days,
}: Configurations) {
    const { t } = useLaravelReactI18n();

    const { data, setData, put, processing, errors } = useForm<Configurations>({
        about,
        days_to_return,
        max_lent_books,
        max_reservation_days,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        put(route('admin.configuration.update'), {
            preserveScroll: true,
        });
    };

    return (
        <ConfigurationLayout>
            <Head title={t('Configuration')} />

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
                            <Label htmlFor="about">{t('About us')}</Label>
                            <Textarea
                                value={data.about || ''}
                                onChange={(e) =>
                                    setData('about', e.target.value)
                                }
                                id="about"
                            />
                            <InputError message={errors.about} />
                        </div>

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

                        <div className="grid gap-2">
                            <Label htmlFor="max_reservation_days">
                                {t('Max Reservation Days')}
                            </Label>
                            <Input
                                type="number"
                                value={data.max_reservation_days}
                                onChange={(e) =>
                                    setData(
                                        'max_reservation_days',
                                        parseInt(e.target.value) || 1,
                                    )
                                }
                                id="max_reservation_days"
                                min="1"
                            />
                            <span className="text-xs text-muted-foreground">
                                {t(
                                    'The number of days to borrow a reserved book.',
                                )}
                            </span>
                            <InputError message={errors.max_reservation_days} />
                        </div>
                    </CardContent>

                    <CardFooter className="border-t px-6 py-4">
                        <Button type="submit" disabled={processing}>
                            {t('Save')}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </ConfigurationLayout>
    );
}
