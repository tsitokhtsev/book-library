<?php

namespace App\Services;

use App\Models\Checkout;

class DashboardService
{
    /**
     * @param int $months
     *
     * @return array
     */
    public function getCheckoutsReturnsOverTime(int $months): array
    {
        $result = [];
        for ($i = $months - 1; $i >= 0; $i--) {
            $month = now()->subMonths($i)->format("Y-m");
            $result[$month] = ['month' => $month, 'checkouts' => 0, 'returns' => 0];
        }

        $checkoutsData = Checkout::selectRaw('DATE_FORMAT(checkout_date, "%Y-%m") as month, COUNT(*) as total')
            ->where('checkout_date', '>=', now()->subMonths($months)->startOfMonth())
            ->groupBy('month')
            ->get()
            ->keyBy('month');

        $returnsData = Checkout::selectRaw('DATE_FORMAT(return_date, "%Y-%m") as month, COUNT(*) as total')
            ->where('return_date', '>=', now()->subMonths($months)->startOfMonth())
            ->groupBy('month')
            ->get()
            ->keyBy('month');

        foreach ($result as $month => &$value) {
            $value['checkouts'] = $checkoutsData->get($month)->total ?? 0;
            $value['returns'] = $returnsData->get($month)->total ?? 0;
        }

        return array_values($result);
    }

    /**
     * @param int $limit
     *
     * @return array
     */
    public function getPopularBooks(int $limit): array
    {
        return Checkout::query()
            ->join('book_copies', 'checkouts.book_copy_id', '=', 'book_copies.id')
            ->join('books', 'book_copies.book_id', '=', 'books.id')
            ->selectRaw('books.id as book_id, books.title as title, COUNT(*) as count')
            ->groupBy('books.id', 'books.title')
            ->orderByDesc('count')
            ->limit($limit)
            ->get()
            ->toArray();
    }
}
