<?php

namespace App\Http\Controllers;

use App\Models\ChallengeComment;
use Illuminate\Http\Request;

class ChallengeCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $attributes = $request->validate([
            'submission_id' => ['required', 'exists:challenge_comments,id'],
        ]);
        $challengeComments = ChallengeComment::with(['user' => function ($query) {
        $query->select('id', 'username');
        }])
            ->where('submission_id', $attributes['submission_id'])
            ->get();


        return response([
            'status' => 'success',
            'challengeComments' => $challengeComments
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {




    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attributes = $request->validate([
            'content' => ['required', 'max: 500'],
            'userId' => ['required'],
            'challengeId' => ['required', 'exists:challenge_comments,id'],
        ]);

        ChallengeComment::create([
            'content' => $attributes['content'],
            'user_id' => $attributes['userId'],
            'submission_id' => $attributes['challengeId']
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(ChallengeComment $challengeComment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ChallengeComment $challengeComment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ChallengeComment $challengeComment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChallengeComment $challengeComment)
    {
        //
    }
}
