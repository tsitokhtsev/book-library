import { type VariantProps, cva } from 'class-variance-authority';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
                secondary:
                    'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                    'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
                outline: 'text-foreground',
                active: 'border-transparent bg-chart-2 text-primary-foreground hover:bg-chart-2/80',
                overdue:
                    'border-transparent bg-chart-4 text-primary-foreground hover:bg-chart-4/80',
                returned:
                    'border-transparent bg-chart-3 text-primary-foreground hover:bg-chart-3/80',
                lost: 'border-transparent bg-chart-1 text-primary-foreground hover:bg-chart-1/80',
                damaged:
                    'border-transparent bg-chart-5 text-primary-foreground hover:bg-chart-5/80',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

function BadgeIsEnabled({ isEnabled }: { isEnabled: boolean }) {
    const { t } = useLaravelReactI18n();

    return (
        <Badge variant={isEnabled ? 'outline' : 'destructive'}>
            {t(isEnabled ? 'Enabled' : 'Disabled')}
        </Badge>
    );
}

function BadgeCheckoutStatus({
    status,
}: {
    status: keyof typeof badgeVariants;
}) {
    const { t } = useLaravelReactI18n();

    return <Badge variant={status}>{t(status)}</Badge>;
}

export { Badge, BadgeIsEnabled, BadgeCheckoutStatus, badgeVariants };
