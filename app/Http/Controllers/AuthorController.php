<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Inertia\Inertia;

class AuthorController extends Controller
{
    public function show(Author $author) {
        $author->load(['books', 'books.language']);

        return Inertia::render('Authors/Show', [
            'author' => $author,
            'books' => $author->books,
        ]);
    }
}
