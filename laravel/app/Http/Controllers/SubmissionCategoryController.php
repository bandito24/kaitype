<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use App\Models\SubmissionCategory;
use Illuminate\Http\Request;

class SubmissionCategoryController extends Controller
{
    private function failureResponse(array $errors): \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Foundation\Application|\Illuminate\Http\Response
    {
        return response([
            'status' => 'failure',
            'errors' => $errors,
        ], 422);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = SubmissionCategory::withCount('submissions')
            ->orderBy('submissions_count', 'desc')
            ->get(['name']);
        return response($categories, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $attributes = $request->validate([
            'title' => ['required', 'max: 20'],
            'description' => ['required', 'max: 255'],
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
                'default_category' => 0,
                'created_by_user' => $userId
            ]);
            $submissionCategoryId = $newCategory->id;
        } else {
            if(!$submissionCategory) return $this->failureResponse(['Submit Failure', ['This Category Does Not Exist']]);
            $submissionCategoryId = $submissionCategory->id;
        }



        $newSubmission = Submission::create([
            'user_id' => $userId,
            'submission_category_id' => $submissionCategoryId,
            'title' => $attributes['title'],
            'content' => $attributes['content']
        ]);

        return response([
            'status' => 'success',
            'new_submission_id' => $newSubmission->id

        ], 200);


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
    public function show(SubmissionCategory $submissionCategory)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SubmissionCategory $submissionCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SubmissionCategory $submissionCategory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubmissionCategory $submissionCategory)
    {
        //
    }
}
