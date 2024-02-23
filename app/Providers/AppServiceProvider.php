<?php

namespace App\Providers;

use App\Http\Middleware\EnsureMobileIsVerified;
use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(Router $router): void
    {
        $router->aliasMiddleware('mobile.verified', EnsureMobileIsVerified::class);
    }
}
