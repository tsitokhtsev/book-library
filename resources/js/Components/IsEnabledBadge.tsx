import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Badge } from '@/Components/Badge';

const IsEnabledBadge = ({ isEnabled }: { isEnabled: boolean }) => {
    const { t } = useLaravelReactI18n();

    return (
        <Badge variant={isEnabled ? 'outline' : 'destructive'}>
            {t(isEnabled ? 'Enabled' : 'Disabled')}
        </Badge>
    );
};

export { IsEnabledBadge };
