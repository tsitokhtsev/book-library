import { Link, useForm, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler, useEffect } from 'react';

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
import { useToast } from '@/Components/useToast';
import { PageProps } from '@/types';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const user = usePage<PageProps>().props.auth.user;
    const { t } = useLaravelReactI18n();
    const { toast } = useToast();

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
        });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    useEffect(() => {
        if (recentlySuccessful) {
            toast({
                title: t('Profile updated successfully'),
            });
        }
    }, [recentlySuccessful]);

    return (
        <form onSubmit={handleSubmit}>
            <Card className="flex flex-grow flex-col">
                <CardHeader>
                    <CardTitle>{t('Profile Information')}</CardTitle>
                    <CardDescription>
                        {t(
                            "Update your account's profile information and email address",
                        )}
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="first_name">{t('First name')}</Label>
                        <Input
                            type="text"
                            value={data.first_name}
                            onChange={(e) =>
                                setData('first_name', e.target.value)
                            }
                            id="first_name"
                            autoComplete="first_name"
                        />
                        <InputError message={errors.first_name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="last_name">{t('Last name')}</Label>
                        <Input
                            type="text"
                            value={data.last_name}
                            onChange={(e) =>
                                setData('last_name', e.target.value)
                            }
                            id="last_name"
                            autoComplete="last_name"
                        />
                        <InputError message={errors.last_name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">{t('Email')}</Label>
                        <Input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            id="email"
                            autoComplete="username"
                        />
                        <InputError message={errors.email} />
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="mt-2 text-sm text-gray-800">
                                {t('Your email address is unverified.')}
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    {t(
                                        'Click here to re-send the verification email.',
                                    )}
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 text-sm font-medium text-green-600">
                                    {t(
                                        'A new verification link has been sent to the email address you provided during registration.',
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>

                <CardFooter className="border-t px-6 py-4">
                    <Button type="submit" disabled={processing}>
                        {t('Save')}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
