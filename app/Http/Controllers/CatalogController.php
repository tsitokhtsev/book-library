<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\Genre;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    public function index(Request $request)
    {
        $filters = [
            'authors' => array_map('intval', $request->input('authors', [])),
            'genres' => array_map('intval', $request->input('genres', [])),
        ];

        $query = Book::query();

        if (!empty($filters['authors'])) {
            $query->whereHas('authors', function ($q) use ($filters) {
                $q->whereIn('authors.id', $filters['authors']);
            });
        }

        if (!empty($filters['genres'])) {
            $query->whereHas('genres', function ($q) use ($filters) {
                $q->whereIn('genres.id', $filters['genres']);
            });
        }

        $books = $query->with(['authors', 'genres'])->paginate(27);

        return Inertia::render('Catalog', [
            'books' => $books,
            'categories' => [
                'authors' => Author::all(),
                'genres' => Genre::all(),
            ],
            'filters' => $filters,
        ]);
    }
}
