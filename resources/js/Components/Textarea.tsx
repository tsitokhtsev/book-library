import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        const textareaRef =
            (ref as React.MutableRefObject<HTMLTextAreaElement>) ||
            React.useRef<HTMLTextAreaElement>(null);
        const [textAreaHeight, setTextAreaHeight] = React.useState('auto');

        const handleResizeHeight = () => {
            const textarea = textareaRef.current;
            if (textarea) {
                setTextAreaHeight('auto');
                const scrollHeight = textarea.scrollHeight;
                setTextAreaHeight(`${scrollHeight}px`);
            }
        };

        React.useEffect(() => {
            handleResizeHeight();
        }, [props.value]);

        return (
            <textarea
                className={cn(
                    'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
                ref={textareaRef}
                style={{ height: textAreaHeight }}
                onChange={(e) => {
                    props.onChange?.(e);
                    handleResizeHeight();
                }}
                {...props}
            />
        );
    },
);
Textarea.displayName = 'Textarea';

export { Textarea };
