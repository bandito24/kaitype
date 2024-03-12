<?php

namespace Database\Seeders;

use App\Models\ChallengeScore;
use App\Models\Submission;
use App\Models\SubmissionCategory;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $javaSubmissions = SubmissionCategory::where('name', 'Java')->first()->submissions;

        for($i = 0; $i < $javaSubmissions->count(); $i++){
            $newUser = User::factory()->create();
            foreach ($javaSubmissions as $submission){
                ChallengeScore::create([
                    'user_id' => $newUser->id,
                    'submission_id' => $submission->id,
                    'milliseconds' => rand(1, 50),
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }
    }
}
