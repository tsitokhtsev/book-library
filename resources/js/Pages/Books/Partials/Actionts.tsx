import { TableMeta } from '@tanstack/react-table';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Button } from '@/Components/Button';
import '@/Components/DropdownMenu';
import { BookCopy } from '@/types/model';

export function Actions({
    bookCopy,
    meta,
}: {
    bookCopy: BookCopy;
    meta: TableMeta<BookCopy>;
}) {
    const { t } = useLaravelReactI18n();

    return <Button>{t('Reserve')}</Button>;
}
