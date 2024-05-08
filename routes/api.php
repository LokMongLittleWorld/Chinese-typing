<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// authenticated routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get ('/authenticated_test', [AuthController::class, 'authenticatedTest']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post ('/logout', [AuthController::class, 'logout']);

    Route::prefix('article')->group(function () {
        Route::get ('/', [ArticleController::class, 'index']);
        Route::post ('/', [ArticleController::class, 'store']);
        Route::get ('/{article}', [ArticleController::class, 'show']);
        Route::put ('/{article}', [ArticleController::class, 'update']);
        Route::delete ('/{article}', [ArticleController::class, 'destroy']);
    });
});

Route::get('/test',[AuthController::class, 'test']);

Route::post ('/register', [AuthController::class, 'register']);
Route::post ('/login', [AuthController::class, 'login']);
