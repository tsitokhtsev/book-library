import { parseDate } from '@internationalized/date';
import { type ClassValue, clsx } from 'clsx';
import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function useForwardedRef<T>(ref: React.ForwardedRef<T>) {
    const innerRef = useRef<T>(null);

    useEffect(() => {
        if (!ref) return;
        if (typeof ref === 'function') {
            ref(innerRef.current);
        } else {
            ref.current = innerRef.current;
        }
    });

    return innerRef;
}

export function getParsedDate(date: string) {
    return date ? parseDate(date.toString()) : null;
}
