<?php

namespace App\Http\Controllers;

use App\Models\SubmissionCategory;
use Illuminate\Http\Request;

class SubmissionCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = SubmissionCategory::withCount('submissions')
            ->orderBy('submissions_count', 'desc')
            ->limit(10)
            ->get(['name']);
        return response($categories, 200);
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
