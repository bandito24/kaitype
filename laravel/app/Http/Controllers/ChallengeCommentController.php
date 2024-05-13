<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChallengeCommentResource;
use App\Models\ChallengeComment;
use App\Models\PastUserVote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;


class ChallengeCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try{
        $submission_id = $request->query('submission_id');
        if(!$submission_id) throw new \Exception('No submission Id submitted');
        $userId = $request->query('user_id') ?? null;

        Validator::make(['submission_id' => $submission_id], [
            'submission_id' => ['required', 'exists:submissions,id'],
        ])->validate();


        $challengeComments = ChallengeComment::with(['user' => function ($query) {
            $query->select('id', 'username');
        }])
            ->where('submission_id', $submission_id)
            ->where('parent_id', NULL)
            ->get();
        $commentCount = ChallengeComment::where('submission_id', $submission_id)->count();
        $pastVotes = null;
        if($userId){
            $pastVotes = PastUserVote::where(['user_id' => $userId, 'submission_id' => $submission_id])->select('id', 'direction', 'challenge_comment_id')->get();
        }
        return response([
            'challengeComments' => ChallengeCommentResource::collection($challengeComments),
            'commentCount' => $commentCount,
            'pastVotes' => $pastVotes
        ]);
        }catch(\Exception $e){
            return response(['status' => 'failure', 'message' => 'Need to provide submission Id'], 400);
        }



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
        try {
            $attributes = $request->validate([
                'content' => ['required', 'max: 500'],
                'challengeId' => ['required', 'exists:submissions,id'],
            ]);
            $user = auth()->user();

            DB::beginTransaction();

            $rowAttributes = [
                'content' => $attributes['content'],
                'submission_id' => $attributes['challengeId'],
                'user_id' => $user->id
            ];

            if (isset($request['parentId'])) {
                $request->validate([
                    'parentId' => ['required', 'exists:challenge_comments,id'],
                ]);
                $parentComment = ChallengeComment::where('id', $request['parentId'])->first();
                $parentComment->has_response = 1;
                $parentComment->save();
                $rowAttributes['parent_id'] = $request['parentId'];
            }
            $comment = ChallengeComment::create($rowAttributes);

            DB::commit();
            return response([
                'status' => 'success',
                'comment' => $comment,
                'user' => $user,
                'parentComment' => $parentComment ?? null
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($parentId)
    {

        $replies = ChallengeComment::with(['user' => function($query){
            $query->select('id', 'username');
        }])
            ->where('parent_id', $parentId)
            ->get();

        return response([
            'status' => 'success',
            'comments' => ChallengeCommentResource::collection($replies)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     * @throws \Exception
     */
    public function edit(Request $request)
    {


    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $comment = ChallengeComment::where('id', $request['postId'])->first();
        if (!$comment) return response(['error' => "Something went wrong on our end. Apologies"], 404);

        $comment->edited = 1;
        $comment->content = $request['content'];
        $comment->save();

        return response(['status' => 'success', 'comment' => $comment]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {

        $comment = ChallengeComment::where('id', $request->query('postId'))->first();
        if (!$comment) return response(['error' => "Something went wrong on our end. Apologies"], 404);
        if ($comment->user_id !== auth()->user()->id) {
            return response(['error' => "You do not have access to this resource"], 403);
        }

        $comment->delete();

        $children = null;
        if($request->query('parentId')){
            $request->validate([
                'parentId' => ['exists:challenge_comments,id']
            ]);
            $parent = ChallengeComment::find($request->query('parentId'));
            $children = $parent->children->count();
            if($parent && $parent->children->count() === 0){
                $parent->has_response = 0;
                $parent->save();
            }
        }


        return response(['status' => 'success', 'message' => 'comment deleted', 'childrenLength' => $children]);

    }
    public function vote(Request $request)
    {

        $request->validate([
            'challenge_comment_id' => ['required', 'integer', 'exists:challenge_comments,id'],
            'submission_id' => ['required', 'exists:submissions,id'],
            'direction' => ['required', 'integer', 'max:2', 'min:-2']
        ]);
        try{
            DB::beginTransaction();
            $user = auth()->user();
            $userId = $user->id;
            $pastVote = PastUserVote::where(['challenge_comment_id' => $request->challenge_comment_id, 'user_id' => $userId])->first();
            if($pastVote){
                if(($request->direction > 0 && $pastVote->direction > 0) || ($request->direction < 0 && $pastVote->direction < 0)){
                    return response(['status' => 'failed', 'message' => 'already voted this direction'], 403);
                }
                $pastVote->direction = $request->direction;
                $pastVote->save();
            } else {
                $pastVote = PastUserVote::create(['user_id' => $userId, 'challenge_comment_id' => $request->challenge_comment_id, 'direction' => $request->direction, 'submission_id' => (int)$request->submission_id]);
            }
            $challengeComment = ChallengeComment::where('id', $request->challenge_comment_id)->first();
            $challengeComment->votes = $challengeComment->votes + $request->direction;
            $challengeComment->save();

            DB::table('past_user_votes')
                ->where('user_id', $userId)
                ->where('challenge_comment_id', $request->challenge_comment_id)
                ->update(['direction' => $request->direction]);

            DB::commit();
            return response(['status' => 'success', 'challengeComment' => $challengeComment, 'pastVote' => $pastVote], 201);
        }catch(\Exception $e){
            DB::rollBack();
            return response(['status' => 'failure', 'message' => $e->getMessage()], 403);
        }


    }
}
