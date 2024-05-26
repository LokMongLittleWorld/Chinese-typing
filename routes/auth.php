<?php 
use App\Http\Controllers\Api\ProviderController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "auth" middleware group. Make something great!
|
*/

Route::get('/{provider}/redirect', [ProviderController::class, 'redirect']);

Route::get('/{provider}/callback', [ProviderController::class, 'callback']);

Route::get('/testSession',[ProviderController::class, 'testSession']);
