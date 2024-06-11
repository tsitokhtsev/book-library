<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateBookCopyRequest;
use App\Models\BookCopy;
use App\Services\BookCopyService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BookCopyController extends Controller
{
    /**
     * @param BookCopyService $bookCopyService
     */
    public function __construct(
        public BookCopyService $bookCopyService
    ) {}

    /**
     * @param UpdateBookCopyRequest $request
     *
     * @return RedirectResponse
     */
    public function update(UpdateBookCopyRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $id = $request->route('book_copy');

        try {
            $this->bookCopyService->updateBookCopy($data, $id);

            return redirect()
                ->route('admin.books.show', $request->book_id)
                ->with('success', __('Book updated successfully!'));
        } catch (Exception $e) {
            Log::error($e);

            return redirect()
                ->back()
                ->with('error', __('Failed to update the book copy. Please try again.'));
        }
    }

    /**
     * @param BookCopy $bookCopy
     *
     * @return RedirectResponse
     */
    public function destroy(BookCopy $bookCopy): RedirectResponse
    {
        $bookCopy->delete();

        return redirect()
            ->route('admin.books.show', $bookCopy->book_id)
            ->with('success', __('Book copy deleted successfully!'));
    }
}
