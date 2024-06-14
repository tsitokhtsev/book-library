import { HTMLAttributes } from 'react';

export default function SuccessMessage({
    message,
    className = '',
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p {...props} className={'text-sm text-green-600 ' + className}>
            {message}
        </p>
    ) : null;
}
