<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReservationRequest;
use App\Models\Reservation;
use App\Services\ReservationService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Response;

class ReservationController extends Controller
{
    /**
     * @param ReservationService $reservationService
     */
    public function __construct(
        public ReservationService $reservationService
    ) {}

    /**
     * @return Response
     */
    public function index(): Response
    {
        $reservations = Auth::user()->reservations()
            ->orderBy('created_at', 'desc')
            ->with('bookCopy:id,code,book_id', 'bookCopy.book:id,title')
            ->select('id', 'book_copy_id', 'reserve_date', 'due_date')
            ->get();

        return inertia('Reservations/Index', [
            'reservations' => $reservations,
        ]);
    }

    /**
     * @param StoreReservationRequest $request
     *
     * @return RedirectResponse
     */
    public function store(StoreReservationRequest $request)
    {
        try {
            $this->reservationService->createReservation($request->validated());

            return redirect()
                ->back()
                ->with('success', __('Book was reserved successfully!'));
        } catch (Exception $e) {
            Log::error($e);

            return redirect()
                ->back()
                ->with('error', __($e->getMessage() ?? 'An error occurred while reserving the book.'));
        }
    }

    /**
     * @param Request $request
     * @param Reservation $reservation
     *
     * @return RedirectResponse
     */
    public function destroy(Request $request, Reservation $reservation): RedirectResponse
    {
        try {
            $this->reservationService->deleteReservation($reservation);

            return redirect()
                ->back()
                ->with('success', __('Reservation was deleted successfully!'));
        } catch (Exception $e) {
            Log::error($e);

            return redirect()
                ->back()
                ->with('error', __($e->getMessage() ?? 'An error occurred while deleting the reservation.'));
        }
    }
}
