<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\Genre;
use App\Models\Language;
use Inertia\Inertia;

class CatalogController extends Controller
{
    public function index()
    {
        $query = Book::query();
        $books = $query->with('authors')->paginate(27);

        return Inertia::render('Catalog', [
            'books' => $books,
            'categories' => [
                'authors' => Author::all(),
                'genres' => Genre::all(),
                'languages' => Language::all()
            ]
        ]);
    }
}
