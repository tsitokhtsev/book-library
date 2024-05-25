<?php

namespace App\Http\Controllers\Admin;

use App\Enums\RolesEnum;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\MemberAdded;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Members/Index', [
            'members' => User::role(RolesEnum::MEMBER)->mostRecent()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Members/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'phone_number' => 'required|digits:9|unique:users',
            'personal_number' => 'required|digits:11|unique:users',
        ]);
        $password = Str::random(8);

        $member = User::create([
            ...$validated,
            'password' => Hash::make($password),
        ])->assignRole(RolesEnum::MEMBER);

        $member->notify(new MemberAdded($password));

        return redirect()
            ->route('admin.members.index')
            ->with('success', 'Member created successfully! An email has been sent to the member with their password.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $member)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $member)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $member)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $member): RedirectResponse
    {
        $this->authorize('delete', $member);

        $member->delete();

        return redirect()
            ->route('admin.members.index')
            ->with('success', 'Member deleted successfully!');
    }
}
