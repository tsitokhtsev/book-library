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

    /**
     * @return array
     */
    public function getLatestCheckouts(): array
    {
        return Checkout::with(
            'user:id,first_name,last_name,personal_number',
            'bookCopy:id,code,book_id',
            'bookCopy.book:id,title',
            'status:id,name'
        )->orderByDesc('id')
            ->select('id', 'user_id', 'book_copy_id', 'status_id', 'checkout_date', 'due_date', 'return_date')
            ->get()
            ->map(function ($checkout) {
                return [
                    'id' => $checkout->id,
                    'member' => [
                        'first_name' => $checkout->user->first_name,
                        'last_name' => $checkout->user->last_name,
                        'personal_number' => $checkout->user->personal_number,
                    ],
                    'book' => [
                        'id' => $checkout->bookCopy->book->id,
                        'title' => $checkout->bookCopy->book->title,
                        'code' => $checkout->bookCopy->code,
                    ],
                    'status' => $checkout->status,
                    'checkout_date' => $checkout->checkout_date,
                    'due_date' => $checkout->due_date,
                    'return_date' => $checkout->return_date,
                ];
            })
            ->toArray();
    }
}
