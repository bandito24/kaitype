<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChallengeCommentResource;
use App\Models\ChallengeComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;


class ChallengeCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($submission_id)
    {

        Validator::make(['submission_id' => $submission_id], [
            'submission_id' => ['required', 'exists:submissions,id'],
        ])->validate();



        $challengeComments = ChallengeComment::with(['user' => function ($query) {
        $query->select('id', 'username');
        }])
            ->where('submission_id', $submission_id)
            ->get();
        return response([
            'challengeComments' => ChallengeCommentResource::collection($challengeComments)
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
            'challengeId' => ['required', 'exists:submissions,id'],
            'isReply' => ['required', 'boolean'],
        ]);
        $user = auth()->user();
        if(!$user) return response(['status' => 'user not found'], 403);

        $comment = ChallengeComment::create([
            'content' => $attributes['content'],
            'submission_id' => $attributes['challengeId'],
            'user_id' => $user->id
        ]);

        return response([
            'status' => 'success',
            'comment' => $comment,
            'user' => $user
        ], 202);

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
     * @throws \Exception
     */
    public function edit(Request $request)
    {

        $comment = ChallengeComment::where('id', $request['postId'])->first();
        if(!$comment) return response(['error' => "Something went wrong on our end. Apologies"], 404);

        $comment->edited = 1;
        $comment->content = $request['content'];
        $comment->save();

        return response(['status' => 'success', 'comment' => $comment]);


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
    public function destroy($postId)
    {

        $comment = ChallengeComment::where('id', $postId)->first();
        if(!$comment) return response(['error' => "Something went wrong on our end. Apologies"], 403);
        if($comment->user_id !== auth()->user()->id){
            return response(['error' => "You do not have access to this resource"], 404);
        }

        $comment->delete();

        return response(['status' => 'success', 'message' => 'comment deleted']);

    }
}
