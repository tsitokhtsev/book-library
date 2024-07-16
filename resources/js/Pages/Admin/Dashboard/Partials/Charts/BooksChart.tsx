import { useLaravelReactI18n } from 'laravel-react-i18n';
import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/Card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/Components/Chart';
import { BooksChartData } from '@/types';

export function BooksChart({ data }: { data: BooksChartData }) {
    const { t } = useLaravelReactI18n();

    const chartConfig = {
        books: {
            label: t('Books'),
        },
        available: {
            label: t('available'),
            color: 'hsl(var(--chart-2))',
        },
        reserved: {
            label: t('reserved'),
            color: 'hsl(var(--chart-3))',
        },
        checkedOut: {
            label: t('checked-out'),
            color: 'hsl(var(--chart-4))',
        },
        lost: {
            label: t('lost'),
            color: 'hsl(var(--chart-5))',
        },
        damaged: {
            label: t('damaged'),
            color: 'hsl(var(--chart-1))',
        },
    } satisfies ChartConfig;

    const chartData = [
        {
            status: 'available',
            books: data.available,
            fill: 'var(--color-available)',
        },
        {
            status: 'reserved',
            books: data.reserved,
            fill: 'var(--color-reserved)',
        },
        {
            status: 'checkedOut',
            books: data.checked_out,
            fill: 'var(--color-checkedOut)',
        },
        {
            status: 'lost',
            books: data.lost,
            fill: 'var(--color-lost)',
        },
        {
            status: 'damaged',
            books: data.damaged,
            fill: 'var(--color-damaged)',
        },
    ];

    const totalBooks = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.books, 0);
    }, []);

    return (
        <Card className="hidden flex-col lg:col-span-2 lg:flex">
            <CardHeader className="pb-0">
                <CardTitle>{t('Books')}</CardTitle>
                <CardDescription>{t('Per status')}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="books"
                            nameKey="status"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        'cx' in viewBox &&
                                        'cy' in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalBooks.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    {t('Book')}
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
