<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
        return Inertia::render('Admin/Dashboard/Index', [
            'lend_data' => $this->dashboardService->getLendData(),
            'return_data' => $this->dashboardService->getReturnData(),
            'books_chart' => $this->dashboardService->getBooksChart(6),
            'checkouts_returns_chart' => $this->dashboardService->getCheckoutsReturnsOverTime(6),
            'popular_books_chart' => $this->dashboardService->getPopularBooks(3),
            'checkouts' => $this->dashboardService->getLatestCheckouts(),
            'reservations' => $this->dashboardService->getLatestReservations(),
        ]);
    }
}
