<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use App\Models\SubmissionCategory;
use Illuminate\Http\Request;

class SubmissionController extends Controller
{
    public function show($id){
         return Submission::select('title', 'content', 'id', 'description')
            ->where('id', $id)
            ->first();
    }
    public function create(Request $request)
    {
        $attributes = $request->validate([
            'title' => ['required', 'max: 20'],
            'description' => ['required', 'max: 97'],
            'category' => ['required', 'max: 20'],
            'content' => ['required'],
            'isCustomCategory' => ['boolean']
        ]);

        $userId = auth()->user()->id;
        $submissionCategory = SubmissionCategory::where('name', $attributes['category'])->first();


        if($attributes['isCustomCategory']){
            if($submissionCategory) return $this->failureResponse(['Creation Failure', ['This Category Already Exists']]);
            $newCategory = SubmissionCategory::create([
                'name' => $attributes['category'],
                'slug' => strtolower(urlencode($attributes['title'])),
                'default_category' => false,
                'created_by_user' => $userId
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
            'title' => $attributes['title'],
            'content' => $attributes['content']
        ]);

        return response([
            'status' => 'success',
            'new_submission_id' => $newSubmission->id

        ], 200);


    }
}
