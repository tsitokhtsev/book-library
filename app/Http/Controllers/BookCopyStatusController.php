<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStatusRequest;
use App\Http\Requests\UpdateStatusRequest;
use App\Models\BookCopyStatus;
use App\Services\BookCopyStatusService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BookCopyStatusController extends Controller
{
    /**
     * @param BookCopyStatusService $statusService
     */
    public function __construct(
        public BookCopyStatusService $statusService
    ) {}

    /**
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Statuses/Index', [
            'statuses' => BookCopyStatus::select('id', 'name')
                ->withCount('bookCopies')
                ->get(),
        ]);
    }

    /**
     * @param StoreStatusRequest $request
     *
     * @return RedirectResponse
     */
    public function store(StoreStatusRequest $request): RedirectResponse
    {
        $this->statusService->createStatus($request->validated());

        return redirect()
            ->route('admin.statuses')
            ->with('success', __('Status created successfully!'));
    }

    /**
     * @param UpdateStatusRequest $request
     * @param BookCopyStatus $status
     *
     * @return RedirectResponse
     * @throws \Exception
     */
    public function update(UpdateStatusRequest $request, BookCopyStatus $status): RedirectResponse
    {
        $this->statusService->updateStatus($request->validated(), $status->id);

        return redirect()
            ->route('admin.statuses')
            ->with('success', __('Status updated successfully!'));
    }

    /**
     * @param BookCopyStatus $status
     *
     * @return RedirectResponse
     */
    public function destroy(BookCopyStatus $status): RedirectResponse
    {
        $status->delete();

        return redirect()
            ->route('admin.statuses')
            ->with('success', __('Status deleted successfully!'));
    }
}
