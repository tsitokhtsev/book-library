import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Card';
import AdminLayout from '@/Layouts/AdminLayout';
import { BooksChart } from '@/Pages/Admin/Dashboard/Partials/Charts/BooksChart';
import { CheckoutsReturnsChart } from '@/Pages/Admin/Dashboard/Partials/Charts/CheckoutsReturnsChart';
import { PopularBooksChart } from '@/Pages/Admin/Dashboard/Partials/Charts/PopularBooksChart';
import Lend from '@/Pages/Admin/Dashboard/Partials/Lend';
import Return from '@/Pages/Admin/Dashboard/Partials/Return';
import {
    BooksChartData,
    CheckoutsReturnsChartData,
    LendData,
    PopularBooksChartData,
    ReturnData,
} from '@/types';

export default function Index({
    lend_data,
    return_data,
    books_chart,
    checkouts_returns_chart,
    popular_books_chart,
}: {
    lend_data: LendData;
    return_data: ReturnData;
    books_chart: BooksChartData;
    checkouts_returns_chart: CheckoutsReturnsChartData;
    popular_books_chart: PopularBooksChartData;
}) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <Card className="flex flex-grow flex-col">
                <div className="flex flex-col justify-between sm:flex-row">
                    <CardHeader>
                        <CardTitle>{t('Dashboard')}</CardTitle>
                    </CardHeader>

                    <div className="mx-6 mb-6 flex gap-2 sm:m-6 sm:flex-row">
                        <Lend data={lend_data} />
                        <Return data={return_data} />
                    </div>
                </div>

                <CardContent>
                    <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-8 lg:gap-6">
                        <BooksChart data={books_chart} />
                        <CheckoutsReturnsChart data={checkouts_returns_chart} />
                        <PopularBooksChart data={popular_books_chart} />
                    </div>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
