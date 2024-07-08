<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBranchRequest;
use App\Http\Requests\UpdateBranchRequest;
use App\Models\Branch;
use App\Services\BranchService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BranchController extends Controller
{
    /**
     * @param BranchService $branchService
     */
    public function __construct(
        public BranchService $branchService
    ) {}

    /**
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Branches/Index', [
            'branches' => Branch::select('id', 'name', 'is_enabled', 'address', 'email', 'phone', 'working_hours')
                ->withCount('bookCopies')
                ->get(),
        ]);
    }

    /**
     * @param StoreBranchRequest $request
     *
     * @return RedirectResponse
     */
    public function store(StoreBranchRequest $request): RedirectResponse
    {
        $this->branchService->createBranch($request->validated());

        return redirect()
            ->route('admin.branches.index')
            ->with('success', __('Branch created successfully!'));
    }

    /**
     * @param UpdateBranchRequest $request
     * @param Branch $branch
     *
     * @return RedirectResponse
     * @throws \Exception
     */
    public function update(UpdateBranchRequest $request, Branch $branch): RedirectResponse
    {
        $this->branchService->updateBranch($request->validated(), $branch->id);

        return redirect()
            ->route('admin.branches.index')
            ->with('success', __('Branch updated successfully!'));
    }

    /**
     * @param Branch $branch
     *
     * @return RedirectResponse
     */
    public function destroy(Branch $branch): RedirectResponse
    {
        $branch->delete();

        return redirect()
            ->route('admin.branches.index')
            ->with('success', __('Branch deleted successfully!'));
    }
}
