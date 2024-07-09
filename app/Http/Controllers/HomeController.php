<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index() {
        return Inertia::render('Home', [
            'newBooks' => Book::with('authors')
                ->orderBy('created_at', 'desc')
                ->limit(12)
                ->get(),
            'authors' => Author::limit(12)->get(),
        ]);
    }
}
