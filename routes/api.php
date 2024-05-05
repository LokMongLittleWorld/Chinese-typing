<?php

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
    Route::post ('/logout', [AuthController::class, 'logout']);
});

Route::get('/test',[AuthController::class, 'test']);

Route::post ('/register', [AuthController::class, 'register']);
Route::post ('/login', [AuthController::class, 'login']);
