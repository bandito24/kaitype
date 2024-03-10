<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreChallengeScoreRequest;
use App\Http\Requests\UpdateChallengeScoreRequest;
use App\Models\ChallengeScore;
use Illuminate\Http\Request;

class ChallengeScoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $userId = $request->input('id');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreChallengeScoreRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ChallengeScore $challengeScore)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ChallengeScore $challengeScore)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChallengeScoreRequest $request, ChallengeScore $challengeScore)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChallengeScore $challengeScore)
    {
        //
    }
}
