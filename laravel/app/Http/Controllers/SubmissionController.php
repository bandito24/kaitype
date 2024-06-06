<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChallengeScoreResource;
use App\Models\ChallengeScore;
use App\Models\Submission;
use App\Models\SubmissionCategory;
use Illuminate\Http\Request;

class SubmissionController extends Controller
{
    public function show($id){
         $submission = Submission::select('name', 'content', 'id', 'description', 'char_count')
            ->where('id', $id)
            ->first();

        $previousResults = ChallengeScore::with('user')
            ->where('submission_id', $id)
            ->orderBy('merit', 'desc')
            ->orderBy('updated_at')
            ->get(['user_id', 'milliseconds', 'merit', 'updated_at']);

        $previousResults->formatMilliseconds();
        $transformedSubmissions = ChallengeScoreResource::collection($previousResults);


        return response([
            'submission' => $submission,
            'previousResults' => $transformedSubmissions
        ]);
    }
    public function create(Request $request)
    {
        $attributes = $request->validate([
            'name' => ['required', 'max: 20'],
            'description' => ['required', 'max: 97'],
            'category' => ['required', 'max: 20'],
            'content' => ['required'],
            'isCustomCategory' => ['boolean'],
            'charCount' => ['required', 'numeric']
        ]);

        $userId = auth()->user()->id;
        $submissionCategory = SubmissionCategory::where('name', $attributes['category'])->first();


        if($attributes['isCustomCategory']){
            if($submissionCategory) return $this->failureResponse(['Creation Failure', ['This Category Already Exists']]);
            $newCategory = SubmissionCategory::create([
                'name' => $attributes['category'],
                'slug' => strtolower(urlencode($attributes['name'])),
                'default_category' => false,
                'created_by_user' => $userId,
                'char_count' => $attributes['charCount']
            ]);
            $submissionCategoryId = $newCategory->id;
        } else {
            if(!$submissionCategory) return $this->failureResponse(['Submit Failure', ['This Category Does Not Exist']]);
            $submissionCategoryId = $submissionCategory->id;
        }
        $newSubmission = Submission::create([
            'user_id' => $userId,
            'description' => $attributes['description'],
            'submission_category_id' => $submissionCategoryId,
            'name' => $attributes['name'],
            'content' => $attributes['content'],
            'char_count' => $attributes['charCount']
        ]);

        return response([
            'status' => 'success',
            'new_submission_id' => $newSubmission->id

        ], 200);


    }
}
