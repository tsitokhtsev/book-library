import { Command as CommandPrimitive } from 'cmdk';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Check, XIcon } from 'lucide-react';
import * as React from 'react';

import { Badge } from '@/Components/Badge';
import {
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/Components/Command';
import { Skeleton } from '@/Components/Skeleton';
import { cn } from '@/lib/utils';
import { SelectOption } from '@/utils/types';

type MultiSelectProps = {
    options: SelectOption[];
    selectedOptions?: number[];
    onValueChange?: (selectedOptions: number[]) => void;
    isLoading?: boolean;
    disabled?: boolean;
    placeholder?: string;
};

export const MultiSelect = ({
    options,
    selectedOptions = [],
    onValueChange,
    disabled,
    isLoading = false,
    placeholder = 'Start search...',
}: MultiSelectProps) => {
    const { t } = useLaravelReactI18n();

    const inputRef = React.useRef<HTMLInputElement>(null);

    const [isOpen, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<number[]>(selectedOptions);
    const [inputValue, setInputValue] = React.useState<string>('');

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current;

            if (!input) {
                return;
            }

            // Keep the options displayed when the user is typing
            if (!isOpen) {
                setOpen(true);
            }

            // This is not a default behaviour of the <input /> field
            if (event.key === 'Enter' && input.value !== '') {
                const optionToSelect = options.find(
                    (option) => option.name === input.value,
                );
                if (optionToSelect) {
                    const updatedSelected = isSelected(optionToSelect)
                        ? selected.filter(
                              (option) => option !== optionToSelect.id,
                          )
                        : [...selected, optionToSelect.id];

                    setSelected(updatedSelected);
                    onValueChange?.(updatedSelected);
                }
            }

            if (event.key === 'Escape') {
                input.blur();
            }
        },
        [isOpen, options, onValueChange],
    );

    const handleBlur = React.useCallback(() => {
        setOpen(false);
        setInputValue('');
    }, [selected]);

    const handleSelectOption = React.useCallback(
        (option: SelectOption) => {
            setInputValue('');

            const updatedSelected = isSelected(option)
                ? selected.filter(
                      (selectedOption) => selectedOption !== option.id,
                  )
                : [...selected, option.id];

            setSelected(updatedSelected);
            onValueChange?.(updatedSelected);

            setTimeout(() => {
                inputRef?.current?.blur();
            }, 0);
        },
        [onValueChange],
    );

    const isSelected = (option: SelectOption) => {
        return selected.includes(option.id);
    };

    return (
        <CommandPrimitive onKeyDown={handleKeyDown} className="relative">
            <CommandInput
                inline
                ref={inputRef}
                value={inputValue}
                onValueChange={isLoading ? undefined : setInputValue}
                onBlur={handleBlur}
                onFocus={() => setOpen(true)}
                placeholder={t(placeholder)}
                disabled={disabled}
            />
            <div className="relative">
                <div
                    className={cn(
                        'absolute top-full z-10 mt-1 w-full rounded-xl bg-white outline-none animate-in fade-in-0 zoom-in-95',
                        isOpen ? 'block' : 'hidden',
                    )}
                >
                    <CommandList className="rounded-lg ring-1 ring-slate-200">
                        {isLoading ? (
                            <CommandPrimitive.Loading>
                                <div className="p-1">
                                    <Skeleton className="h-8 w-full" />
                                </div>
                            </CommandPrimitive.Loading>
                        ) : null}
                        {options.length > 0 && !isLoading ? (
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.id}
                                        value={option.name}
                                        onMouseDown={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                        }}
                                        onSelect={() =>
                                            handleSelectOption(option)
                                        }
                                        className={cn(
                                            'flex w-full items-center gap-2',
                                            !isSelected(option) ? 'pl-8' : null,
                                        )}
                                    >
                                        {isSelected(option) ? (
                                            <Check className="w-4" />
                                        ) : null}
                                        {option.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ) : null}
                        {!isLoading ? (
                            <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                                {t('No results')}
                            </CommandPrimitive.Empty>
                        ) : null}
                    </CommandList>
                </div>
            </div>

            {selected.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {options
                        .filter((option) => isSelected(option))
                        .map((option) => (
                            <Badge key={option.id} className="gap-1">
                                {option.name}
                                <XIcon
                                    className="h-3 w-3 cursor-pointer"
                                    onClick={() => handleSelectOption(option)}
                                />
                            </Badge>
                        ))}
                </div>
            )}
        </CommandPrimitive>
    );
};
