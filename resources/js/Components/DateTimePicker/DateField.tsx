import { createCalendar } from '@internationalized/date';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useRef } from 'react';
import { AriaDatePickerProps, DateValue, useDateField } from 'react-aria';
import { useDateFieldState } from 'react-stately';

import { DateSegment } from '@/Components/DateTimePicker/DateSegment';
import { cn } from '@/lib/utils';

function DateField(props: AriaDatePickerProps<DateValue>) {
    const ref = useRef<HTMLDivElement | null>(null);

    const { currentLocale } = useLaravelReactI18n();
    const state = useDateFieldState({
        ...props,
        locale: currentLocale(),
        createCalendar,
    });
    const { fieldProps } = useDateField(props, state, ref);

    return (
        <div
            {...fieldProps}
            ref={ref}
            className={cn(
                'inline-flex h-10 flex-1 items-center rounded-l-md border border-r-0 border-input bg-transparent py-2 pl-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                props.isDisabled ? 'cursor-not-allowed opacity-50' : '',
            )}
        >
            {state.segments.map((segment, i) => (
                <DateSegment key={i} segment={segment} state={state} />
            ))}
            {state.isInvalid && <span aria-hidden="true">🚫</span>}
        </div>
    );
}

export { DateField };