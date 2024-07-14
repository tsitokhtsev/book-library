import { Link } from '@inertiajs/react';
import React from 'react';

import Image from '@/Components/Image';
import useRoute from '@/lib/hooks/useRoute';
import { Author } from '@/types/model';

interface AuthorCardProps {
    author: Author;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
    return (
        <Link href={useRoute('authors.show', author.id)}>
            <div className="flex h-max flex-col justify-between rounded-lg p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <h2 className="mb-2 text-lg font-bold">{author.name}</h2>
                <Image
                    src={'/storage/' + author.cover_image}
                    alt={author.name}
                    className="mb-2 h-72 w-full rounded object-cover"
                    fallbackSrc="https://via.placeholder.com/150?text=Author+Image"
                />
            </div>
        </Link>
    );
};

export default AuthorCard;
