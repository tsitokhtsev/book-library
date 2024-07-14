import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

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
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/Components/Chart';
import { getMonthFromDate } from '@/lib/utils';
import { CheckoutsReturnsChartData } from '@/types';

export function CheckoutsReturnsChart({
    data,
}: {
    data: CheckoutsReturnsChartData;
}) {
    const { t } = useLaravelReactI18n();

    const chartConfig = {
        checkouts: {
            label: t('Checked out'),
            color: 'hsl(var(--chart-2))',
        },
        returns: {
            label: t('Returned'),
            color: 'hsl(var(--chart-3))',
        },
    } satisfies ChartConfig;

    return (
        <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
                <CardTitle>{t('Checkouts and Returns')}</CardTitle>
                <CardDescription>
                    {t(getMonthFromDate(data[0].month))} -{' '}
                    {t(getMonthFromDate(data[data.length - 1].month))}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={data}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) =>
                                t(getMonthFromDate(value)).slice(0, 3)
                            }
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="checkouts"
                            fill="var(--color-checkouts)"
                            radius={4}
                        />
                        <Bar
                            dataKey="returns"
                            fill="var(--color-returns)"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
