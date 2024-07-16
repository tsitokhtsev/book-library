<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MassUpdateCheckoutRequest;
use App\Http\Requests\StoreCheckoutRequest;
use App\Models\User;
use App\Services\CheckoutService;
use Exception;
use Illuminate\Http\RedirectResponse;
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
    public function store(StoreCheckoutRequest $request): RedirectResponse
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
                ->with('error', __($e->getMessage() ?? 'An error occurred while checking out books.'));
        }
    }

    /**
     * @param MassUpdateCheckoutRequest $request
     *
     * @return RedirectResponse
     */
    public function massUpdate(MassUpdateCheckoutRequest $request): RedirectResponse
    {
        try {
            $this->checkoutService->updateCheckout($request->validated());
            $bookCount = count($request->checkouts);
            $member = User::find($request->member_id);

            return redirect()
                ->back()
                ->with('success', __(
                    ':bookCount book(s) successfully returned from :member.',
                    ['bookCount' => $bookCount, 'member' => $member->first_name . ' ' . $member->last_name])
                );
        } catch (Exception $e) {
            Log::error($e);

            return redirect()
                ->back()
                ->with('error', __($e->getMessage() ?? 'An error occurred while returning books.'));
        }
    }
}
