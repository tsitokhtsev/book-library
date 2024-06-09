import { PropsWithChildren } from 'react';

export function H4({ children }: PropsWithChildren) {
    return (
        <h4 className="mb-2 mt-6 scroll-m-20 text-xl font-semibold tracking-tight">
            {children}
        </h4>
    );
}
