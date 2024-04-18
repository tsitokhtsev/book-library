<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Models\Author;
use App\Models\Book;
use App\Models\BookCopy;
use App\Models\Branch;
use App\Models\Condition;
use App\Models\Genre;
use App\Models\Language;
use App\Models\Status;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
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
            'genres' => Genre::get(['id', 'name']),
            'authors' => Author::get(['id', 'name']),
            'branches' => Branch::get(['id', 'name']),
            'conditions' => Condition::get(['id', 'name']),
        ]);
    }

    public function save(SaveBookRequest $request) {
        $validated = $request->validated();

        DB::beginTransaction();

        try {
            $book = Book::create([...$validated,
                'publication_date' => $request->date('publication_date'),
                'language_id' => Language::where('name', $validated['language'])->first()->id
            ]);

            $book->genres()->sync(array_column($validated['genres'], 'id'));
            $book->authors()->sync(array_column($validated['authors'], 'id'));

            foreach ($validated['book_copies'] as $branchData) {
                $validatedCopy = Validator::make($branchData, [
                    'code' => 'required|string|unique:book_copies,code',
                ])->validated();

                BookCopy::create([
                    'code' => $validatedCopy['code'],
                    'book_id' => $book->id,
                    'branch_id' => Branch::where('name', $branchData['branch'])->first()->id,
                    'condition_id' => Condition::where('name', $branchData['condition'])->first()->id,
                    'status_id' => Status::first()->id
                ]);
            }

            DB::commit();
            return to_route('admin.books');
        } catch (Exception $e) {
            DB::rollback();
            Log::error($e);
            return redirect()->back()->with('error', 'Failed to save the book. Please try again.');
        }
    }

    public function show(Request $request) {
        return Inertia::render('Books/Edit',[
            'languages' => Language::all(),
            'genres' => Genre::get(['id', 'name']),
            'authors' => Author::get(['id', 'name']),
            'branches' => Branch::get(['id', 'name']),
            'conditions' => Condition::get(['id', 'name']),
            'book' => Book::where('isbn', $request->route()->parameter('isbn'))
                ->with('bookCopies', 'bookCopies.branch', 'bookCopies.condition')->with('genres')->with('authors')->with('language')
                ->first()
        ]);
    }

    public function update(UpdateBookRequest $request) {
        $validated = $request->validated();

        DB::beginTransaction();

        try {
            $book = Book::firstOrFail('id', $request->get('id'));
            $book->update([...$validated,
                'publication_date' => $request->date('publication_date'),
                'language_id' => $validated['language']['id']
            ]);


            $book->genres()->sync(array_column($validated['genres'], 'id'));
            $book->authors()->sync(array_column($validated['authors'], 'id'));

            $book->bookCopies()->delete();


            foreach ($validated['book_copies'] as $book_copy) {
                $validatedCopy = Validator::make($book_copy, [
                    'code' => [
                        'required',
                        'string',
                        Rule::unique('book_copies')->ignore($book_copy['code'], 'code')
                    ],
                ])->validated();

                BookCopy::create([
                    'code' => $validatedCopy['code'],
                    'book_id' => $book->id,
                    'branch_id' => Branch::where('name', $book_copy['branch'])->first()->id,
                    'condition_id' => Condition::where('name', $book_copy['condition'])->first()->id,
                    'status_id' => Status::first()->id // You might want to update the status here if necessary
                ]);
            }

            DB::commit();
            return to_route('admin.books');
        } catch (Exception $e) {
            DB::rollback();
            Log::error($e);
            return redirect()->back()->with('error', 'Failed to update the book. Please try again.');
        }
    }


    public function massDelete(Request $request) {
        Book::whereIn('isbn', $request->get('isbns'))->delete();

        return to_route('admin.books');
    }

    public function destroy(Request $request) {
        Book::where('isbn', $request->get('isbn'))->first()->delete();

        return to_route('admin.books');
    }
}
