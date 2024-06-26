<?php

namespace Database\Seeders;

use App\Models\ChallengeScore;
use App\Models\Submission;
use App\Models\SubmissionCategory;
use App\Models\User;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * @throws Exception
     */
    public function run(): void
    {
        $names = [
            "James",
            "Mary",
            "John",
            "Patricia",
            "Robert",
            "Jennifer",
            "Michael",
            "Linda",
            "William",
            "Elizabeth",
            "David",
            "Barbara",
            "Richard",
            "Susan",
            "Joseph",
            "Jessica",
            "Thomas",
            "Sarah",
            "Charles",
            "Karen"
        ];
        try {
            $submissionCategory = SubmissionCategory::with('submissions')->get();

            if ($submissionCategory->count() <= 0) {
                throw new Exception("Submissions for scores seeding empty. Users won't be created because of this");
            }

            $score = 2000;
            $submissionCategory->each(function($s) use ($names, $score){
            for ($i = 0; $i < $s->submissions->count(); $i++) {
                $testName = $names[rand(0, 19)] . rand(1,2000);
                $newUser = User::create([
                    'email' => $testName . '@gmail.com',
                    'email_verified_at' => now(),
                    'username' => $testName,
                    'password' => (string)rand(0,5000),
                    'remember_token' => Str::random(10),
                ]);
                foreach ($s->submissions as $submission) {
                    ChallengeScore::create([
                        'user_id' => $newUser->id,
                        'submission_id' => $submission->id,
                        'milliseconds' => $score,
                        'merit' => rand(0,15),
                        'created_at' => now(),
                        'updated_at' => now()
                    ]);
                }
                $score = $score + 3500;
            }
            });
        }catch(Exception $e){
            echo "Error during seeding: " . $e->getMessage();
        }
    }
}
