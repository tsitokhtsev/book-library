<?php

namespace App\Services;

use App\Enums\BookCopyStatus;
use App\Models\BookCopy;
use App\Models\Configuration;
use App\Models\Reservation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReservationService
{
    /**
     * @param array $data
     *
     * @return mixed
     */
    public function createReservation(array $data): mixed
    {
        return DB::transaction(function () use ($data) {
            $maxLentBooks = Configuration::where('key', 'max_lent_books')->first()->value;
            $maxReservationDays = Configuration::where('key', 'max_reservation_days')->first()->value;

            $user = Auth::user();
            $activeReservations = $user->reservations()->count();

            if ($activeReservations == $maxLentBooks) {
                throw new \Exception('User has reached the maximum number of reservations.');
            }

            $bookCopy = BookCopy::where('id', $data['book_copy_id'])
                ->where('status_id', BookCopyStatus::AVAILABLE->intValue())
                ->first();

            if (!$bookCopy) {
                throw new \Exception('Book is not available for reservation.');
            }

            BookCopy::where('id', $data['book_copy_id'])
                ->update(['status_id' => BookCopyStatus::RESERVED->intValue()]);

            return Reservation::create([
                'user_id' => $user->id,
                'book_copy_id' => $data['book_copy_id'],
                'reserve_date' => now(),
                'due_date' => now()->addDays($maxReservationDays),
            ]);
        });
    }

    /**
     * @param Reservation $reservation
     *
     * @return mixed
     */
    public function deleteReservation(Reservation $reservation): mixed
    {
        return DB::transaction(function () use ($reservation) {
            $reservation->bookCopy->update(['status_id' => BookCopyStatus::AVAILABLE->intValue()]);

            return $reservation->delete();
        });
    }
}
