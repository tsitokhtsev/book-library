<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
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
    public function __construct(
        public BookService $bookService
    ) {}

    /**
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Books/Index', [
            'books' => Book::with('language')->get(),
        ]);
    }

    /**
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Books/Create', [
            'languages' => Language::all(),
            'genres' => Genre::get(['id', 'name']),
            'authors' => Author::get(['id', 'name']),
        ]);
    }

    /**
     * @param StoreBookRequest $request
     *
     * @return RedirectResponse
     */
    public function store(StoreBookRequest $request): RedirectResponse
    {
        $data = $request->validated();

        try {
            $this->bookService->createBook($data);

            return redirect()
                ->route('admin.books.index')
                ->with('success', 'Book created successfully!');
        } catch (Exception $e) {
            Log::error($e);

            return redirect()
                ->back()
                ->with('error', 'Failed to create the book. Please try again.');
        }
    }

    /**
     * @param Book $book
     *
     * @return Response
     */
    public function show(Book $book): Response
    {
        return Inertia::render('Admin/Books/Show', [
            'book' => $book->load('language', 'genres', 'authors'),
            'book_copies' => $book->bookCopies()
                ->with('branch', 'condition', 'status')
                ->get(),
            'branches' => Branch::get(['id', 'name']),
            'statuses' => Status::get(['id', 'name']),
            'conditions' => Condition::get(['id', 'name']),
        ]);
    }

    /**
     * @param Book $book
     *
     * @return Response
     */
    public function edit(Book $book): Response
    {
        return Inertia::render('Admin/Books/Edit', [
            'book_id' => $book->id,
            'book' => [
                ...$book->toArray(),
                'language' => $book->language_id,
                'genres' => $book->genres->pluck('id'),
                'authors' => $book->authors->pluck('id'),
            ],
            'languages' => Language::get(['id', 'name']),
            'genres' => Genre::get(['id', 'name']),
            'authors' => Author::get(['id', 'name']),
        ]);
    }

    /**
     * @param UpdateBookRequest $request
     *
     * @return RedirectResponse
     */
    public function update(UpdateBookRequest $request)
    {
        $validated = $request->validated();

        DB::beginTransaction();

        try {
            $this->bookService->updateBook($validated, $request->get('id'));
            DB::commit();

            return to_route('admin.books.index');
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
    public function massDelete(Request $request)
    {
        Book::whereIn('isbn', $request->get('ids'))->delete();

        return to_route('admin.books.index');
    }

    /**
     * @param Request $request
     *
     * @return RedirectResponse
     */
    public function destroy(Request $request)
    {
        Book::where('isbn', $request->get('isbn'))->first()->delete();

        return to_route('admin.books.index');
    }
}
