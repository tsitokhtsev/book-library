import { Link } from '@inertiajs/react';
import { BookUserIcon } from 'lucide-react';

import { Card, CardFooter, CardHeader } from '@/Components/Card';
import Image from '@/Components/Image';
import { Author } from '@/types/model';

export function AuthorCard({ author }: { author: Author }) {
    return (
        <Link href={route('authors.show', author.id)}>
            <Card className="transition-shadow duration-300 hover:shadow-md">
                <CardHeader>
                    <p className="line-clamp-2 text-lg font-semibold">
                        {author.name}
                    </p>
                </CardHeader>

                <CardFooter className="aspect-square justify-center">
                    {author.cover_image ? (
                        <Image
                            src={'/storage/' + author.cover_image}
                            alt={author.name}
                            className="w-full rounded object-cover"
                            fallbackSrc="https://via.placeholder.com/150?text=Author+Image"
                        />
                    ) : (
                        <BookUserIcon className="h-1/3 w-full text-gray-300" />
                    )}
                </CardFooter>
            </Card>
        </Link>
    );
}
