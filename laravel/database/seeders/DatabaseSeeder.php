<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Submission;
use App\Models\SubmissionCategory;
use App\Models\User;
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
//         \App\Models\User::factory(10)->create();

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

//        Submission::factory()->count(99)->create();


        $this->call([
            SubmissionSeeder::class,
            UserSeeder::class
        ]);
    }
}
