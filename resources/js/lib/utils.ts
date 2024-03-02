import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getLocaleLabel(locale: string) {
    let label = '';

    switch (locale) {
        case 'en':
            label = 'Eng';
            break;
        case 'ka':
            label = 'Geo';
            break;
        default:
            label = locale.charAt(0).toUpperCase() + locale.slice(1);
            break;
    }

    return label;
}
