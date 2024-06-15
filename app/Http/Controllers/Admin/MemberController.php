<?php

namespace App\Http\Controllers\Admin;

use App\Enums\RolesEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMemberRequest;
use App\Http\Requests\UpdateMemberRequest;
use App\Models\User;
use App\Services\MemberService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class MemberController extends Controller
{
    /**
     * @param MemberService $memberService
     */
    public function __construct(
        public MemberService $memberService
    ) {}

    /**
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Members/Index', [
            'members' => User::role(RolesEnum::MEMBER)
                ->mostRecent()
                ->get([
                    'id',
                    'first_name',
                    'last_name',
                    'email',
                    'phone_number',
                    'personal_number',
                ]),
        ]);
    }

    /**
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Members/Create');
    }

    /**
     * @param StoreMemberRequest $request
     *
     * @return RedirectResponse
     */
    public function store(StoreMemberRequest $request): RedirectResponse
    {
        try {
            $member = $this->memberService->createMember($request->validated());

            return redirect()
                ->route('admin.members.index')
                ->with('success', __(
                    'Member created successfully! An email has been sent to :name with the password.',
                    ['name' => $member->first_name . ' ' . $member->last_name]
                ));
        } catch (Exception $e) {
            Log::error($e);

            return redirect()
                ->back()
                ->with('error', __('Failed to create the member. Please try again.'));
        }
    }

    /**
     * @param User $member
     *
     * @return Response
     */
    public function show(User $member)
    {
        //
    }

    /**
     * @param User $member
     *
     * @return Response
     */
    public function edit(User $member): Response
    {
        return Inertia::render('Admin/Members/Edit', [
            'member_id' => $member->id,
            'member' => $member->only([
                'first_name',
                'last_name',
                'email',
                'phone_number',
                'personal_number',
            ]),
        ]);
    }

    /**
     * @param UpdateMemberRequest $request
     * @param User $member
     *
     * @return RedirectResponse
     */
    public function update(UpdateMemberRequest $request, User $member): RedirectResponse
    {
        try {
            $this->memberService->updateMember($request->validated(), $member->id);

            return redirect()
                ->route('admin.members.index')
                ->with('success', __(
                    'The profile of :name has been updated successfully!',
                    ['name' => $member->first_name . ' ' . $member->last_name]
                ));
        } catch (Exception $e) {
            Log::error($e);

            return redirect()
                ->back()
                ->with('error', __('Failed to update the member. Please try again.'));
        }
    }

    /**
     * @param User $member
     *
     * @return RedirectResponse
     */
    public function destroy(User $member): RedirectResponse
    {
        $member->delete();

        return redirect()
            ->route('admin.members.index')
            ->with('success', __(
                'The member :name has been deleted successfully!',
                ['name' => $member->first_name . ' ' . $member->last_name]
            ));
    }
}
