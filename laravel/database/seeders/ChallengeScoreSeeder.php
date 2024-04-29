<?php

namespace Database\Seeders;

use App\Models\SubmissionCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ChallengeScoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $javaId = SubmissionCategory::where('name', 'Java')->first();

    }
}
