<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreConditionRequest;
use App\Http\Requests\UpdateConditionRequest;
use App\Models\Condition;
use App\Services\ConditionService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ConditionController extends Controller
{
    /**
     * @param ConditionService $conditionService
     */
    public function __construct(
        public ConditionService $conditionService
    ) {}

    /**
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Conditions/Index', [
            'conditions' => Condition::select('id', 'name')
                ->withCount('bookCopies')
                ->get(),
        ]);
    }

    /**
     * @param StoreConditionRequest $request
     *
     * @return RedirectResponse
     */
    public function store(StoreConditionRequest $request): RedirectResponse
    {
        $this->conditionService->createCondition($request->validated());

        return redirect()
            ->route('admin.conditions.index')
            ->with('success', __('Condition created successfully!'));
    }

    /**
     * @param UpdateConditionRequest $request
     * @param Condition $condition
     *
     * @return RedirectResponse
     * @throws Exception
     */
    public function update(UpdateConditionRequest $request, Condition $condition): RedirectResponse
    {
        $this->conditionService->updateCondition($request->validated(), $condition->id);

        return redirect()
            ->route('admin.conditions.index')
            ->with('success', __('Condition updated successfully!'));
    }

    /**
     * @param Condition $condition
     *
     * @return RedirectResponse
     */
    public function destroy(Condition $condition): RedirectResponse
    {
        $condition->delete();

        return redirect()
            ->route('admin.conditions.index')
            ->with('success', __('Condition deleted successfully!'));
    }
}
