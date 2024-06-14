import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

export interface H4Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export function H4({ className, children }: PropsWithChildren<H4Props>) {
    return (
        <h4
            className={cn(
                'mb-2 mt-6 scroll-m-20 text-xl font-semibold tracking-tight',
                className,
            )}
        >
            {children}
        </h4>
    );
}
