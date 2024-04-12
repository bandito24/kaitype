<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Submission;
use App\Models\SubmissionCategory;
use App\Models\User;
use Exception;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    private array $languages = [
        'Python', 'Javascript', 'C++', 'Ruby', 'Java', 'Rust', 'Perl', 'SQL', 'Typescript', 'PHP'
    ];

    public function run(): void
    {
        try {
//         \App\Models\User::factory()->create();

            $user = User::create([
                'email' => 'cmudd6@gmail.com',
                'username' => 'bandito24',
                'password' => 'smudd6413',
                'email_verified_at' => now()
            ]);

            foreach ($this->languages as $lang) {
                SubmissionCategory::create([
                    'name' => $lang,
                    'slug' => strtolower(urlencode($lang)),
                    'created_by_user' => $user->id,
                    'default_category' => true
                ]);
            }

//        Submission::factory()->create();


            $this->call([
                SubmissionSeeder::class,
                UserSeeder::class
            ]);
        } catch (Exception $e) {
            echo "failed with: " . $e->getMessage();
        }
    }

}
