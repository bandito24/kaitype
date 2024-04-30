<?php

namespace App\Http\Controllers;

use App\Models\ChallengeComment;
use App\Models\ChallengeCommentReply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use mysql_xdevapi\Exception;

class ChallengeCommentReplyController extends Controller
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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     * @throws \Exception
     */
    public function store(Request $request)
    {
        $attributes = $request->validate([
            'parentId' => ['required', 'exists:challenge_comments,id'],
            'content' => ['required'],
        ]);
        $user = auth()->user();
        $userId = $user->id;
        if(!$userId) return response('Please sign in to reply', 401);

        DB::beginTransaction();
        try{

        $newReply = ChallengeCommentReply::create([
            'user_id' => $userId,
            'content' => $attributes['content'],
            'parent_id' => $attributes['parentId']
        ]);
        $parentComment = ChallengeComment::where('id', $attributes['parentId'])->first();
        $parentComment->has_response = 1;
        $parentComment->save();
        DB::commit();

        return response([
            'status' => 'success',
            'newReply' => $newReply,
            'parent' => $parentComment
        ], 201);
        } catch(\Exception $e){
            DB::rollback();
            return response([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ChallengeCommentReply $challengeCommentReply)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ChallengeCommentReply $challengeCommentReply)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ChallengeCommentReply $challengeCommentReply)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChallengeCommentReply $challengeCommentReply)
    {
        //
    }
}
