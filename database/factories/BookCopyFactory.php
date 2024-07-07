<?php

namespace Database\Factories;

use App\Enums\BookCopyStatus;
use App\Models\Branch;
use App\Models\Condition;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookCopy>
 */
class BookCopyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => $this->faker->unique()->numerify('##########'),
            'branch_id' => $this->faker->randomElement(Branch::pluck('id')),
            'status_id' => BookCopyStatus::AVAILABLE->intValue(),
            'condition_id' => $this->faker->randomElement(Condition::pluck('id')),
        ];
    }
}
