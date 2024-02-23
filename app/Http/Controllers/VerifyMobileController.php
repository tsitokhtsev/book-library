<?php

namespace App\Http\Controllers;

use Fouladgar\MobileVerification\Events\Verified;
use Fouladgar\MobileVerification\Exceptions\InvalidTokenException;
use Fouladgar\MobileVerification\Tokens\TokenBrokerInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VerifyMobileController extends Controller
{
    public function __construct(protected TokenBrokerInterface $tokenBroker) {}

    public function show() {
        return Inertia::render('Auth/VerifyMobile');
    }

    public function verify(Request $request) {
        $user = $request->user();

        if ($user->hasVerifiedMobile()) {
            return $request->expectsJson() ? $this->unprocessableEntity() : redirect($this->redirectPath());
        }

        try {
            $this->tokenBroker->verifyToken($user, $request->token);
        } catch (InvalidTokenException $e) {
            return $request->expectsJson()
                ? response()->json(['message' => $e->getMessage()], $e->getCode())
                : back()->withErrors(['token' => $e->getMessage()]);
        }

        event(new Verified($user, $request->all()));

        return $request->expectsJson()
            ? $this->successMessage()
            : redirect($this->redirectPath())->with(
                'mobileVerificationVerified',
                __('MobileVerification::mobile_verifier.successful_verification')
            );
    }

    public function resend(Request $request) {
        $user = $request->user();

        if ($user->hasVerifiedMobile()) {
            return $request->expectsJson() ? $this->unprocessableEntity() : redirect($this->redirectPath());
        }

        $this->tokenBroker->sendToken($user);

        return $request->expectsJson()
            ? $this->successResendMessage()
            : back()->with('mobileVerificationResend', __('MobileVerification::mobile_verifier.successful_resend'));
    }


    public function redirectPath(): string {
        return '/dashboard';
    }
}
