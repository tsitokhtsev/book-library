<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Models\Author;
use App\Models\Book;
use App\Models\Branch;
use App\Models\Condition;
use App\Models\Genre;
use App\Models\Language;
use App\Models\Status;
use App\Services\BookService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller
{
    /**
     * @param BookService $bookService
     */
    public function __construct(public BookService $bookService){}

    /**
     * @param Request $request
     *
     * @return Response
     */
    public function index(Request $request) {
        return Inertia::render('Books/Index', [
            'props' => Book::with('language')->simplePaginate(10)
        ]);
    }

    /**
     * @param Request $request
     *
     * @return Response
     */
    public function add(Request $request) {
        return Inertia::render('Books/Add',[
            'languages' => Language::all(),
            'genres' => Genre::get(['id', 'name']),
            'authors' => Author::get(['id', 'name']),
            'branches' => Branch::get(['id', 'name']),
            'conditions' => Condition::get(['id', 'name']),
            'statuses' => Status::get(['id', 'name']),
        ]);
    }

    /**
     * @param SaveBookRequest $request
     *
     * @return RedirectResponse
     */
    public function save(SaveBookRequest $request) {
        $validated = $request->validated();

        DB::beginTransaction();

        try {
            $this->bookService->createBook($validated);
            DB::commit();

            return to_route('admin.books');
        } catch (Exception $e) {
            DB::rollback();
            Log::error($e);

            return redirect()->back()->with('error', 'Failed to save the book. Please try again.');
        }
    }

    /**
     * @param Request $request
     *
     * @return Response
     */
    public function show(Request $request) {
        return Inertia::render('Books/Edit',[
            'languages' => Language::all(),
            'genres' => Genre::get(['id', 'name']),
            'authors' => Author::get(['id', 'name']),
            'branches' => Branch::get(['id', 'name']),
            'conditions' => Condition::get(['id', 'name']),
            'statuses' => Status::get(['id', 'name']),
            'book' => Book::where('isbn', $request->route()->parameter('isbn'))
                ->with('bookCopies', 'bookCopies.branch', 'bookCopies.condition', 'bookCopies.status')
                ->with('genres')->with('authors')->with('language')
                ->first()
        ]);
    }

    /**
     * @param UpdateBookRequest $request
     *
     * @return RedirectResponse
     */
    public function update(UpdateBookRequest $request) {
        $validated = $request->validated();

        DB::beginTransaction();

        try {
            $this->bookService->updateBook($validated, $request->get('id'));
            DB::commit();

            return to_route('admin.books');
        } catch (Exception $e) {
            DB::rollback();
            Log::error($e);

            return redirect()->back()->with('error', 'Failed to update the book. Please try again.');
        }
    }

    /**
     * @param Request $request
     *
     * @return RedirectResponse
     */
    public function massDelete(Request $request) {
        Book::whereIn('isbn', $request->get('isbns'))->delete();

        return to_route('admin.books');
    }

    /**
     * @param Request $request
     *
     * @return RedirectResponse
     */
    public function destroy(Request $request) {
        Book::where('isbn', $request->get('isbn'))->first()->delete();

        return to_route('admin.books');
    }
}
