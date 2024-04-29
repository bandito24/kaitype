<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChallengeCommentController;
use App\Http\Controllers\ChallengeScoreController;
use App\Http\Controllers\SubmissionCategoryController;
use App\Http\Controllers\SubmissionController;
use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/signout', [AuthController::class, 'signout']);
    Route::post('/createSubmission', [SubmissionController::class, 'create']);

    Route::post('/discussion/store', [ChallengeCommentController::class, 'store']);
    Route::patch('/discussion/patch', [ChallengeCommentController::class, 'edit']);
    Route::delete('/discussion/delete/{postID}', [ChallengeCommentController::class, 'destroy']);

});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/signin', [AuthController::class, 'signin']);


Route::get('/categories', [SubmissionCategoryController::class, 'index']);

Route::get('/categories/{slug}', [SubmissionCategoryController::class, 'show']);
Route::get('/submission/{id}', [SubmissionController::class, 'show']);

Route::get('/challengeScores/{submission_id}', [ChallengeScoreController::class, 'show']);
Route::post('/completedChallenge', [ChallengeScoreController::class, 'store']);

Route::get('/discussion/{submission_id}', [ChallengeCommentController::class, 'index']);




