<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\BookCopyStatus;
use App\Models\Branch;
use App\Models\Condition;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookController extends Controller
{
    public function show(Book $book)
    {
        $isInWishlist = Auth::check() ? Auth::user()->wishlists()->where('book_id', $book->id)->exists() : false;

        $book->load('language', 'genres', 'authors');
        $book->is_in_wishlist = $isInWishlist;

        return Inertia::render('Books/Show', [
            'book' => $book,
            'book_copies' => $book->bookCopies()
                ->with('branch:id,name', 'condition:id,name', 'status:id,name')
                ->get(['id', 'code', 'book_id', 'branch_id', 'status_id', 'condition_id']),
            'branches' => Branch::get(['id', 'name']),
            'statuses' => BookCopyStatus::get(['id', 'name']),
            'conditions' => Condition::get(['id', 'name']),
            'reviews' => $book->reviews()
                ->with('user:id,first_name,last_name')
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get(['id', 'review', 'rating', 'user_id', 'created_at']),
            'average_rating' => (float)$book->reviews()->avg('rating'),
            'user_has_review' => Auth::check() && $book->reviews()->where('user_id', Auth::id())->exists(),
        ]);
    }
}
