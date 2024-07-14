import { usePage } from '@inertiajs/react';

import { PageProps } from '@/types';

const useRoute = (routeName: string, authorId?: number): string => {
    const {
        auth: { user },
    } = usePage<PageProps>().props;

    return user?.is_admin
        ? route(`admin.${routeName}`, authorId)
        : route(routeName, authorId);
};

export default useRoute;
