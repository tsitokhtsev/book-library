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
    public function __construct(public BookCopyService $bookCopyService){}

    /**
     * @param UpdateBookCopyRequest $request
     *
     * @return RedirectResponse
     */
    public function update(UpdateBookCopyRequest $request) {
        $validated = $request->validated();

        try {
            $this->bookCopyService->updateBookCopy($validated, $request->route()->parameter('code'));

            return redirect()->back()->with('success', 'Updated Successfully');
        } catch (Exception $e) {
            Log::error($e);
            return redirect()->back()->with('error', 'Failed to update the book. Please try again.');
        }
    }

    /**
     * @param Request $request
     *
     * @return RedirectResponse
     */
    public function destroy(Request $request) {
        try {
            $bookCopy = BookCopy::where('code', $request->route()->parameter('code'))->first();

            if ($bookCopy) {
                $book = $bookCopy->book;
                if ($book->bookCopies()->count() > 1) {
                    $bookCopy->delete();
                    return redirect()->back()->with('success', 'Deleted successfully');
                } else {
                    return redirect()->back()->with('error', "Cannot delete it because it is the only copy of the book");
                }
            } else {
                return redirect()->back()->with('error', "Book copy not found");
            }
        } catch (Exception $e) {
            Log::error($e);
            return redirect()->back()->with('error', 'Failed to delete the book. Please try again.');
        }
    }
}
