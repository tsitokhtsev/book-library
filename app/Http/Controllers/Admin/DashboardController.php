<?php

namespace App\Http\Controllers\Admin;

use App\Enums\BookCopyStatus;
use App\Enums\RolesEnum;
use App\Http\Controllers\Controller;
use App\Models\BookCopy;
use App\Models\Checkout;
use App\Models\Configuration;
use App\Models\User;
use App\Services\DashboardService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * @param DashboardService $dashboardService
     */
    public function __construct(
        public DashboardService $dashboardService
    ) {}

    /**
     * @return Response
     */
    public function index(): Response
    {
        $maxLentBooks = Configuration::where('key', 'max_lent_books')->first()->value;

        return Inertia::render('Admin/Dashboard/Index', [
            'lend_data' => [
                'members' => User::role(RolesEnum::MEMBER)
                    ->whereHas('checkouts', fn($query) => $query->isNotReturned(), '<', $maxLentBooks)
                    ->select('id', 'first_name', 'last_name', 'personal_number')
                    ->withCount(['checkouts' => fn($query) => $query->isNotReturned()])
                    ->get(),
                'book_copies' => BookCopy::with('book:id,title', 'branch:id,name')
                    ->withStatus([BookCopyStatus::AVAILABLE])
                    ->select('id', 'code', 'book_id', 'branch_id')
                    ->get(),
                'max_lent_books' => $maxLentBooks,
            ],
            'return_data' => [
                'members' => User::role(RolesEnum::MEMBER)
                    ->whereHas('checkouts', fn($query) => $query->isNotReturned())
                    ->select('id', 'first_name', 'last_name', 'personal_number')
                    ->get(),
                'checkouts' => Checkout::with(
                    'bookCopy:id,code,book_id,status_id',
                    'bookCopy.book:id,title'
                )->select('id', 'user_id', 'book_copy_id', 'checkout_date', 'due_date')
                    ->isNotReturned()
                    ->get(),
            ],
            'books_chart' => [
                'available' => BookCopy::withStatus([BookCopyStatus::AVAILABLE])->count(),
                'checked_out' => BookCopy::withStatus([BookCopyStatus::CHECKED_OUT])->count(),
                'lost' => BookCopy::withStatus([BookCopyStatus::LOST])->count(),
                'damaged' => BookCopy::withStatus([BookCopyStatus::DAMAGED])->count(),
            ],
            'checkouts_returns_chart' => $this->dashboardService->getCheckoutsReturnsOverTime(6),
            'popular_books_chart' => $this->dashboardService->getPopularBooks(3),
        ]);
    }
}
