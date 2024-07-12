import { Link } from '@inertiajs/react';
import React from 'react';

import Image from '@/Components/Image';
import { Author } from '@/types/model';

interface AuthorCardProps {
    author: Author;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
    return (
        <Link href="#">
            <div className="rounded-lg p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <h2 className="mb-2 text-lg font-bold">{author.name}</h2>
                <Image
                    src={'/storage/' + author.cover_image}
                    alt={author.name}
                    className="mb-2 h-auto w-full rounded"
                    fallbackSrc="https://via.placeholder.com/150?text=Author+Image"
                />
            </div>
        </Link>
    );
};

export default AuthorCard;
