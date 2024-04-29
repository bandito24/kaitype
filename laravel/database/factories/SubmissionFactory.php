<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Submission>
 */
class SubmissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 2,
            'submission_category_id' => rand(1, 10),
            'title' => $this->faker->words(3, true),
            'description' => $this->faker->sentence(10),
            'content' => $this->faker->paragraph(20),
            'created_at' => now()

        ];
    }
}
