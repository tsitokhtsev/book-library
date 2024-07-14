import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

export interface H3Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export function H3({ className, children }: PropsWithChildren<H3Props>) {
    return (
        <h3
            className={cn(
                'mb-6 scroll-m-20 text-2xl font-semibold tracking-tight',
                className,
            )}
        >
            {children}
        </h3>
    );
}
