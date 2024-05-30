<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        $this->configureRateLimiting();

        // RateLimiter::for('api', function (Request $request) {
        //     return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        // });

        $this->routes(function () {
            Route::middleware(['throttle:global'])->group(function() {
                Route::middleware('api')
                    ->prefix('api')
                    ->group(base_path('routes/api.php'));

                Route::middleware('web')
                    ->group(base_path('routes/web.php'));

                Route::middleware('auth')
                    ->prefix('auth')
                    ->group(base_path('routes/auth.php'));
            });
        });

    }

    protected function configureRateLimiting(): void
    {
        RateLimiter::for('email', function (Request $request) {
            return Limit::perMinute(1)->by($request->ip());
        });

        RateLimiter::for('global', function (Request $request) {
            return $request->user()
                ? Limit::perMinute(100)->by($request->user()->id)
                : Limit::perMinute(50)->by($request->ip());
        });
    }
}
