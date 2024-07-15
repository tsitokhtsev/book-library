import { Link, router, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { PencilIcon } from 'lucide-react';
import { useState } from 'react';
import ReactStars from 'react-rating-stars-component';

import { Badge } from '@/Components/Badge';
import { Button } from '@/Components/Button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/Card';
import { DataTable } from '@/Components/DataTable';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/Components/Dialog';
import Image from '@/Components/Image';
import { H4 } from '@/Components/Typography/H4';
import { columns } from '@/Pages/Admin/Books/Copies/Partials/columns';
import { PageProps, SelectOption } from '@/types';
import { Book, BookCopy, Review } from '@/types/model';

import { Textarea } from './Textarea';

export default function BookDetails({
    book,
    book_copies,
    branches,
    conditions,
    statuses,
    average_rating,
    reviews,
    user_has_review,
}: {
    book: Book;
    book_copies: BookCopy[];
    branches: SelectOption[];
    conditions: SelectOption[];
    statuses: SelectOption[];
    average_rating: number;
    reviews: Review[];
    user_has_review: boolean;
}) {
    const { t } = useLaravelReactI18n();
    const {
        auth: { user },
    } = usePage<PageProps>().props;

    const [newReview, setNewReview] = useState('');
    const [newRating, setNewRating] = useState(0);
    const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (book.is_in_wishlist) {
            removeFromWishlist();
        } else {
            addToWishlist();
        }
    };

    const addToWishlist = () => {
        router.post(route('wishlist.store'), { book_id: book.id });
    };

    const removeFromWishlist = () => {
        router.delete(route('wishlist.destroy', book.id));
    };

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            router.post(route('reviews.store'), {
                book_id: book.id,
                review: newReview,
                rating: newRating,
            });
            setNewReview('');
            setNewRating(0);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
        setIsReviewDialogOpen(false);
    };

    return (
        <Card className="flex flex-grow flex-col">
            <div className="flex flex-col justify-between sm:flex-row">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        {book.title}
                        <Badge
                            variant={
                                book.is_enabled ? 'outline' : 'destructive'
                            }
                        >
                            {t(book.is_enabled ? 'Enabled' : 'Disabled')}
                        </Badge>
                    </CardTitle>
                    <CardDescription>
                        {book.authors.map((author) => author.name).join(', ')}
                    </CardDescription>
                </CardHeader>

                <div className="mx-6 mb-6 flex flex-row-reverse gap-2 sm:m-6 sm:flex-row">
                    {user?.is_admin ? (
                        <>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0"
                                asChild
                            >
                                <Link href={route('admin.books.edit', book.id)}>
                                    <span className="sr-only">
                                        {t('Edit Book')}
                                    </span>
                                    <PencilIcon className="h-4 w-4" />
                                </Link>
                            </Button>

                            <Button className="w-full" asChild>
                                <Link
                                    href={route(
                                        'admin.books.copies.create',
                                        book.id,
                                    )}
                                >
                                    {t('Add Copies')}
                                </Link>
                            </Button>
                        </>
                    ) : (
                        <Button
                            className="w-full"
                            onClick={handleWishlistClick}
                        >
                            {book.is_in_wishlist
                                ? t('Remove From Wishlist')
                                : t('Add To Wishlist')}
                        </Button>
                    )}
                </div>
            </div>

            <CardContent className="flex flex-grow flex-col">
                <div className="grid gap-2 text-muted-foreground">
                    <p>
                        {t('ISBN')}: {book.isbn}
                    </p>
                    <Image
                        src={'/storage/' + book.cover_image}
                        alt={book.title}
                        fallbackSrc="https://via.placeholder.com/150?text=Author+Image"
                    />
                    <p>
                        {t('Language')}: {t(book.language.name)}
                    </p>
                    <p>
                        {t('Published')}:{' '}
                        {new Date(book.publication_date).toLocaleDateString()}
                    </p>
                    <p>
                        {t('Genres')}:{' '}
                        {book.genres.map((genre) => genre.name).join(', ')}
                    </p>
                </div>
                <ReactStars
                    count={5}
                    onChange={(newRating: number) => {
                        if (!user) {
                            router.visit(route('login'));
                            return;
                        }
                        setNewRating(newRating);
                        setIsReviewDialogOpen(true);
                    }}
                    value={average_rating}
                    size={24}
                    activeColor="#ffd700"
                    edit={!user_has_review}
                />

                {book.description && (
                    <section>
                        <H4>{t('Description')}</H4>
                        <p>{book.description}</p>
                    </section>
                )}

                {reviews?.length > 0 && (
                    <section>
                        <H4>{t('Reviews')}</H4>
                        {reviews.map((review, index) => {
                            const { rating } = review;
                            return (
                                <div key={index} className="mb-4">
                                    <ReactStars
                                        count={5}
                                        value={rating}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffd700"
                                        key={review.id}
                                    />
                                    <p>{review.review}</p>
                                    <p className="text-muted-foreground">
                                        {review.user.first_name}{' '}
                                        {review.user.last_name} -{' '}
                                        {new Date(
                                            review.created_at,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            );
                        })}
                    </section>
                )}

                <section className="flex flex-grow flex-col">
                    <H4>{t('Book Copies')}</H4>
                    <DataTable
                        data={book_copies}
                        columns={columns}
                        filterBy="code"
                        meta={{ branches, statuses, conditions }}
                    />
                </section>

                <section className="flex flex-grow flex-col">
                    <Dialog
                        open={isReviewDialogOpen}
                        onOpenChange={setIsReviewDialogOpen}
                    >
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>{t('Write a review')}</DialogTitle>
                            </DialogHeader>
                            <Textarea
                                value={newReview}
                                onChange={(e) => setNewReview(e.target.value)}
                                placeholder={t('Write a review')}
                                required
                            />
                            <Button onClick={handleReviewSubmit}>
                                {t('Submit')}
                            </Button>
                        </DialogContent>
                    </Dialog>
                </section>
            </CardContent>
        </Card>
    );
}
