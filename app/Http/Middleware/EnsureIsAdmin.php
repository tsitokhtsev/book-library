<?php

namespace App\Http\Middleware;

use App\Enums\RolesEnum;
use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure(Request): (Response) $next
     * @return Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user()->isAdmin()) {
            return $request->expectsJson()
                ? abort(403)
                : redirect(RouteServiceProvider::HOME);
        }

        return $next($request);
    }
}
