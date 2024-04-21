<?php

namespace App\Http\Controllers;

use App\Models\ChallengeComment;
use Illuminate\Http\Request;

class ChallengeCommentController extends Controller
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
        $attributes = $request->validate([
            'content' => ['required', 'max: 255'],
            'userId' => ['required']
        ]);
        if(isset($request['parentId'])){
            $attributes[] = $request['parentId'];
        }
        ChallengeComment::create([
            'content' => $attributes['content'],
            'user_id' => $attributes['userId'],

        ]);


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
