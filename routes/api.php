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

    //auth
    Route::get ('/authenticated_test', [AuthController::class, 'authenticatedTest']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post ('/logout', [AuthController::class, 'logout']);
    Route::middleware(['throttle:email'])->group(function () {
        Route::get('/reverify',[AuthController::class, 'reverify']);
    });


    //article
    Route::prefix('article')->group(function () {
        Route::post ('/index', [ArticleController::class, 'index']);
        Route::get ('/user', [ArticleController::class, 'user']);
        Route::post ('/', [ArticleController::class, 'store']);
        Route::get('/{article_id}', [ArticleController::class, 'show']);
        Route::put ('/{article_id}', [ArticleController::class, 'update']);
        Route::delete ('/{article_id}', [ArticleController::class, 'destroy']);
        Route::post ('/like', [ArticleController::class, 'like']);
    });
});

//test route
Route::get('/test',[AuthController::class, 'test']);

//authentication routes
Route::post ('/register', [AuthController::class, 'register']);
Route::post ('/login', [AuthController::class, 'login']);
Route::post ('/callbackLogin', [AuthController::class, 'callbackLogin']);
Route::get('/verify/{user_id}',[AuthController::class, 'verify'])->name('verify');
Route::get('/reverify/{user_id}',[AuthController::class, 'reverify']);

Route::prefix('anonymous')->group(function () {
//anonymous Article routes
    Route::prefix('article')->group(function () {
        Route::post('/index', [ArticleController::class, 'anonymousIndex']);
        Route::get('/category', [ArticleController::class, 'category']);
        Route::get('/{article_id}', [ArticleController::class, 'show']);
    });
});
