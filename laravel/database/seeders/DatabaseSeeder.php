<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\SubmissionCategory;
use App\Models\User;
use Illuminate\Database\Seeder;

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
             'email' => 'admin@example.com',
             'username' => 'mr. admin',
             'password' => '123',
             'email_verified_at' => now()
         ]);

         foreach ($this->languages as $lang){
             SubmissionCategory::create([
                 'name' => $lang,
                 'created_by_user' => $user->id,
                 'default_category' => true
             ]);
         }

    }
}
