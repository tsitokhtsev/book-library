<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookCopyRequest;
use App\Http\Requests\UpdateBookCopyRequest;
use App\Models\Book;
use App\Models\BookCopy;
use App\Models\BookCopyStatus;
use App\Models\Branch;
use App\Models\Condition;
use App\Services\BookCopyService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class BookCopyController extends Controller
{
    /**
     * @param BookCopyService $bookCopyService
     */
    public function __construct(
        public BookCopyService $bookCopyService
    ) {}

    /**
     * @param Book $book
     *
     * @return Response
     */
    public function create(Book $book): Response
    {
        return Inertia::render('Admin/Books/Copies/Create', [
            'book_id' => $book->id,
            'branches' => Branch::get(['id', 'name']),
            'statuses' => BookCopyStatus::get(['id', 'name']),
            'conditions' => Condition::get(['id', 'name']),
        ]);
    }

    /**
     * @param StoreBookCopyRequest $request
     * @param Book $book
     *
     * @return RedirectResponse
     */
    public function store(StoreBookCopyRequest $request, Book $book): RedirectResponse
    {
        try {
            $this->bookCopyService->createBookCopies($request->validated(), $book->id);

            return redirect()
                ->route('admin.books.show', $book->id)
                ->with('success', __('Book copies created successfully!'));
        } catch (Exception $e) {
            Log::error($e);

            return redirect()
                ->back()
                ->with('error', __('Failed to create the copies. Please try again.'));
        }
    }

    /**
     * @param UpdateBookCopyRequest $request
     * @param BookCopy $copy
     *
     * @return RedirectResponse
     */
    public function update(UpdateBookCopyRequest $request, BookCopy $copy): RedirectResponse
    {
        try {
            $this->bookCopyService->updateBookCopy($request->validated(), $copy->id);

            return redirect()
                ->route('admin.books.show', $copy->book_id)
                ->with('success', __('Book copy updated successfully!'));
        } catch (Exception $e) {
            Log::error($e);

            return redirect()
                ->back()
                ->with('error', __('Failed to update the book copy. Please try again.'));
        }
    }

    /**
     * @param BookCopy $copy
     *
     * @return RedirectResponse
     */
    public function destroy(BookCopy $copy): RedirectResponse
    {
        $copy->delete();

        return redirect()
            ->route('admin.books.show', $copy->book_id)
            ->with('success', __('Book copy deleted successfully!'));
    }
}
