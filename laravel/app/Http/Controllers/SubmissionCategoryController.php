<?php

namespace App\Http\Controllers;

use App\Models\ChallengeScore;
use App\Models\Submission;
use App\Models\SubmissionCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

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
    public function show(Request $request, $slug)
    {
        $page = $request->input('page', 1);
        $category = SubmissionCategory::where('slug', $slug)->first();

        $categoryCount = Submission::where('submission_category_id', $category->id)->count();

        $categoryChallenges = Submission::where('submission_category_id', $category->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10, ['name', 'id', 'description'], 'page', $page);


        $user = auth('sanctum')->user() ?? null;
        if ($user) {
            $userId = $user->id;
            $submissionIds = $categoryChallenges->getCollection()->pluck('id');
            $userScores = ChallengeScore::whereIn('submission_id', $submissionIds)
                ->where('user_id', $userId)
                ->select('submission_id')
                ->get();
            if ($userScores) {
                $allScores = $userScores->map(fn($query) => ChallengeScore::where('submission_id', $query->submission_id)
                    ->select('merit', 'user_id', 'submission_id', 'milliseconds')
                    ->orderBy('merit', 'desc')
                    ->orderBy('milliseconds', 'asc')
                    ->get());
                $position = $allScores->mapWithKeys(function ($score) use ($userId, $allScores) {
                    $userRank = ($score->search(fn($val) => $val->user_id === $userId)) + 1;
                    $submissionId = $score->first()->submission_id;
                    return [$submissionId => $userRank !== false ? $userRank : null];
                });
                $challenges = $categoryChallenges->map(function ($category) use ($position) {
                    if ($position->has($category->id)) {
                        $category->position = $position->get($category->id); // Add a new property to the category object
                    }
                    return $category; // Return the modified category
                });
                $categoryChallenges->setCollection($challenges);
            }

        }


        return response([
            'categoryChallenges' => $categoryChallenges,
            'categoryName' => $category->name,
            'categoryCount' => $categoryCount,
        ], 200);


    }


    public function index(Request $request)
    {
        if ($request->has('categoryList')) {
            $categories = SubmissionCategory::withCount('submissions')
                ->orderBy('submissions_count', 'desc')->get();
            return response($categories, 200);
        }

        $page = $request->input('page', 1);
        $categories = SubmissionCategory::withCount('submissions')
            ->orderBy('submissions_count', 'desc')
            ->paginate(2, ['name'], 'page', $page);


        $user = auth('sanctum')->user() ?? null;
        if ($user) {
            $categoryIds = $categories->pluck('id');
            $pastSubmissions = ChallengeScore::select('submission_id', 'user_id')
                ->with(['submission' => fn($query) => $query->select('id', 'submission_category_id as category_id')
                    ->whereIn('submission_category_id', $categoryIds)
                ])
                ->where('user_id', $user->id)
                ->get();
            $pastSubmissions = $pastSubmissions->pluck('submission.category_id');
            $result = [];
            $pastSubmissions->each(function ($val) use (&$result) {
                if (isset($result[$val])) {
                    $result[$val]++;
                } else {
                    $result[$val] = 1;
                }
            });
            $modified = $categories->getCollection()->map(fn($val) => tap($val, fn($v) => $v->userProgress = $result[$val->id] ?? 0));

            $categories->setCollection($modified);
        }


        return response($categories, 200);



    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $attributes = $request->validate([
            'name' => ['required', 'max: 20'],
            'description' => ['required', 'max: 30'],
            'category' => ['required', 'max: 20'],
            'content' => ['required'],
            'isCustomCategory' => ['boolean']
        ]);

        $userId = auth()->user()->id;
        $submissionCategory = SubmissionCategory::where('name', $attributes['category'])->first();


        if ($attributes['isCustomCategory']) {
            if ($submissionCategory) return $this->failureResponse(['Creation Failure', ['This Category Already Exists']]);
            $newCategory = SubmissionCategory::create([
                'name' => $attributes['category'],
                'slug' => strtolower(urlencode($attributes['name'])),
                'default_category' => false,
                'created_by_user' => $userId
            ]);
            $submissionCategoryId = $newCategory->id;
        } else {
            if (!$submissionCategory) return $this->failureResponse(['Submit Failure', ['This Category Does Not Exist']]);
            $submissionCategoryId = $submissionCategory->id;
        }
        $newSubmission = Submission::create([
            'user_id' => $userId,
            'description' => $attributes['description'],
            'submission_category_id' => $submissionCategoryId,
            'name' => $attributes['name'],
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
//    public function show(SubmissionCategory $submissionCategory)
//    {
//
//    }

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
