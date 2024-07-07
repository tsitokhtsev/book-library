<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCheckoutRequest;
use App\Models\Checkout;
use App\Models\User;
use App\Services\CheckoutService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CheckoutController extends Controller
{
    /**
     * @param CheckoutService $checkoutService
     */
    public function __construct(
        public CheckoutService $checkoutService
    ) {}

    /**
     * @param StoreCheckoutRequest $request
     *
     * @return RedirectResponse
     */
    public function store(StoreCheckoutRequest $request)
    {
        try {
            $this->checkoutService->createCheckout($request->validated());
            $bookCount = count($request->book_copies);
            $member = User::find($request->member_id);

            return redirect()
                ->back()
                ->with('success', __(
                    ':bookCount book(s) successfully checked out to :member.',
                    ['bookCount' => $bookCount, 'member' => $member->first_name . ' ' . $member->last_name])
                );
        } catch (Exception $e) {
            Log::error($e);

            return redirect()
                ->back()
                ->with('error', __('An error occurred while checking out books.'));
        }
    }
}
