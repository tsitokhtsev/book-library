import { Head, Link, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler, useEffect } from 'react';

import { Button } from '@/Components/Button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/Card';
import { useToast } from '@/Components/useToast';
import MainLayout from '@/Layouts/MainLayout';

export default function VerifyEmail({ status }: { status?: string }) {
    const { t } = useLaravelReactI18n();
    const { toast } = useToast();
    const { post, processing, wasSuccessful } = useForm({});

    useEffect(() => {
        if (status === 'verification-link-sent' && wasSuccessful) {
            toast({
                title: t('A new verification link has been sent.'),
            });
        }
    }, [status, wasSuccessful]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <MainLayout>
            <Head title={t('Email Verification')} />

            <div className="flex grow items-center justify-center">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            {t('Email Verification')}
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="text-gray-600">
                            {t(
                                "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.",
                            )}
                        </div>
                    </CardContent>

                    <CardFooter>
                        <form
                            onSubmit={submit}
                            className="flex w-full items-center justify-between"
                        >
                            <Button disabled={processing}>
                                {t('Resend Verification Email')}
                            </Button>

                            <Button variant="link" asChild>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                >
                                    {t('Log out')}
                                </Link>
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            </div>
        </MainLayout>
    );
}
