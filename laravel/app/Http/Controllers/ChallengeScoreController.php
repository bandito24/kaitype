<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreChallengeScoreRequest;
use App\Http\Requests\UpdateChallengeScoreRequest;
use App\Models\ChallengeScore;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class ChallengeScoreController extends Controller
{
    private function includeUserInfo($collection){
        return $collection->each(function($submission){
            if($submission['user_id'] !== -1){
                $submission->setAttribute('username', $submission->user->username);
                $submission->unsetRelation('user');
            }
        });
    }
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
    public function store(Request $request)
    {
        $loggedIn = $request['user_id'] !== -1;
        $timeDifference = null;

        if ($loggedIn) {
            $previousRecord = ChallengeScore::where('user_id', $request['user_id'])
                ->where('submission_id', $request['submission_id'])
                ->value('milliseconds');

            if ($previousRecord) {
                $timeDifference = $request['milliseconds'] - $previousRecord;
            }

            if (!$timeDifference || $timeDifference < 0) {
                ChallengeScore::updateOrCreate([
                    'user_id' => $request['user_id'],
                    'submission_id' => $request['submission_id']
                ], [
                    'milliseconds' => $request['milliseconds'],
                ]);
            }
        }
        $pastSubmissions = ChallengeScore::with('user')
            ->where('submission_id', $request['submission_id'])
            ->get(['user_id', 'milliseconds', 'updated_at']);


        if (!$loggedIn) {
            $anonymousAdd = collect([
                'user_id' => $request['user_id'] ?? -1,
                'milliseconds' => $request['milliseconds'],
                'updated_at' => now()
            ]);
            $pastSubmissions->push($anonymousAdd);
        }
        $pastSubmissions = $pastSubmissions->sortBy(
            ['milliseconds', 'asc'],
            ['updated_at', 'asc']
        )->values();

        $formattedPastSubmissions = $pastSubmissions->formatMilliseconds();
        $this->includeUserInfo($formattedPastSubmissions);
        $currentRanking = $formattedPastSubmissions->search(fn($item) => $item['user_id'] == $request['user_id']) + 1;


        return response([
            'status' => 'success',
            'user_id' => $request['user_id'],
            'currentRanking' => $currentRanking,
            'updatedSubmissions' => $formattedPastSubmissions->values()->all(),
            'timeDifference' => $timeDifference,
            'loggedIn' => $loggedIn,
        ]);


    }

    /**
     * Display the specified resource.
     */
    public function show($submission_id)
    {
        $pastSubmissions = ChallengeScore::with('user')
            ->where('submission_id', $submission_id)
            ->orderBy('milliseconds')
            ->orderBy('updated_at')
            ->get(['user_id', 'milliseconds', 'updated_at']);

        return $pastSubmissions;
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
