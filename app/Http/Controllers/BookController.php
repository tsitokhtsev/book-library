<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\BookCopyStatus;
use App\Models\Branch;
use App\Models\Condition;
use Inertia\Inertia;

class BookController extends Controller
{
    public function show(Book $book) {
        return Inertia::render('Books/Show', [
            'book' => $book->load('language', 'genres', 'authors'),
            'book_copies' => $book->bookCopies()
                ->with('branch:id,name', 'condition:id,name', 'status:id,name')
                ->get(['id', 'code', 'book_id', 'branch_id', 'status_id', 'condition_id']),
            'branches' => Branch::get(['id', 'name']),
            'statuses' => BookCopyStatus::get(['id', 'name']),
            'conditions' => Condition::get(['id', 'name']),
        ]);
    }
}
