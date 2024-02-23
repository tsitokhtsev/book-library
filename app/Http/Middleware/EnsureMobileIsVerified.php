<?php

namespace App\Http\Middleware;

use Closure;
use Fouladgar\MobileVerification\Contracts\MustVerifyMobile;

class EnsureMobileIsVerified
{
    public function handle($request, Closure $next): mixed
    {
        $user = auth()->user();

        if (! $user || ($user instanceof MustVerifyMobile && ! $user->hasVerifiedMobile())) {
            return $request->expectsJson()
                ? abort(403, __('MobileVerification::mobile_verifier.not_verified'))
                : redirect('/verify-mobile')->withErrors(['mobile' => __('MobileVerification::mobile_verifier.not_verified')]);
        }

        return $next($request);
    }
}
