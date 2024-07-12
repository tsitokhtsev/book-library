<?php

namespace App\Services;

use App\Enums\BookCopyStatus;
use App\Enums\CheckoutStatus;
use App\Models\BookCopy;
use App\Models\Checkout;
use App\Models\Configuration;
use Illuminate\Support\Facades\DB;

class CheckoutService
{
    /**
     * @param array $data
     *
     * @return mixed
     */
    public function createCheckout(array $data): mixed
    {
        return DB::transaction(function () use ($data) {
            $daysToReturn = Configuration::where('key', 'days_to_return')->first()->value;
            $maxLentBooks = Configuration::where('key', 'max_length_books')->first()->value;
            $activeCheckouts = Checkout::where('user_id', $data['member_id'])
                ->isNotReturned()
                ->count();
            $totalCheckouts = $activeCheckouts + count($data['book_copies']);

            if ($totalCheckouts > $maxLentBooks) {
                throw new \Exception('Member has reached the maximum number of books that can be checked out.');
            }

            BookCopy::whereIn('id', $data['book_copies'])
                ->update(['status_id' => BookCopyStatus::CHECKED_OUT->intValue()]);

            foreach ($data['book_copies'] as $bookCopyId) {
                Checkout::create([
                    'user_id' => $data['member_id'],
                    'book_copy_id' => $bookCopyId,
                    'status_id' => CheckoutStatus::ACTIVE->intValue(),
                    'checkout_date' => now(),
                    'due_date' => now()->addDays($daysToReturn),
                ]);
            };

            $updatedBookCopies = BookCopy::whereIn('id', $data['book_copies'])->get();
            return $updatedBookCopies;
        });
    }
}
