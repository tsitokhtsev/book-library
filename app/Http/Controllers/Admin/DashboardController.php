<?php

namespace App\Http\Controllers\Admin;

use App\Enums\BookCopyStatus;
use App\Enums\RolesEnum;
use App\Http\Controllers\Controller;
use App\Models\BookCopy;
use App\Models\Checkout;
use App\Models\Configuration;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * @return Response
     */
    public function index(): Response
    {
        $maxLentBooks = Configuration::where('key', 'max_lent_books')->first()->value;

        return Inertia::render('Admin/Dashboard', [
            'lend_data' => [
                'members' => [
                    ...User::role(RolesEnum::MEMBER)
                        ->whereHas('checkouts', fn($query) => $query->isNotReturned(), '<', $maxLentBooks)
                        ->select('id', 'first_name', 'last_name', 'personal_number')
                        ->withCount(['checkouts' => fn($query) => $query->isNotReturned()])
                        ->get(),
                ],
                'book_copies' => BookCopy::with('book:id,title', 'branch:id,name')
                    ->withStatus([BookCopyStatus::AVAILABLE])
                    ->select('id', 'code', 'book_id', 'branch_id')
                    ->get(),
                'max_lent_books' => $maxLentBooks,
            ],
            'checkouts' => Checkout::with('bookCopy:id,code', 'user:id,first_name,last_name')
                ->select('id', 'book_copy_id', 'user_id', 'due_date')
                ->isNotReturned()
                ->get(),
        ]);
    }
}
