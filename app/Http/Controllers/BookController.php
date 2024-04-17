<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveBookRequest;
use App\Models\Author;
use App\Models\Book;
use App\Models\Genre;
use App\Models\Language;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index(Request $request) {
        return Inertia::render('Books/Index', [
            'props' => Book::with('language')->simplePaginate(10)
        ]);
    }

    public function add(Request $request) {
        return Inertia::render('Books/Add',[
            'languages' => Language::all(),
            'genres' => Genre::all(),
            'authors' => Author::all()
        ]);
    }

    public function save(SaveBookRequest $request) {
        $validated = $request->validated();

        $book = Book::create([...$validated,
            'publication_date' => $request->date('publication_date'),
            'language_id' => Language::where('name', $validated['language'])->first()->id
        ]);

        $book->genres()->sync(array_column($validated['genres'], 'id'));
        $book->authors()->sync(array_column($validated['authors'], 'id'));

        return to_route('admin.books');
    }

    public function massDelete(Request $request) {
        Book::whereIn('isbn', $request->get('isbns'))->delete();

        return to_route('admin.books');
    }
}
