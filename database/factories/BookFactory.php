<?php

namespace Database\Factories;

use App\Models\Author;
use App\Models\Genre;
use App\Models\Language;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => rtrim($this->faker->sentence(), '.'),
            'isbn' => $this->faker->unique()->isbn13(),
            'description' => $this->faker->text(500),
            'publication_date' => $this->faker->date(),
            'language_id' => $this->faker->randomElement(Language::pluck('id')),
        ];
    }
}
