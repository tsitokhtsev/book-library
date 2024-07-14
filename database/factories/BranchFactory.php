<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Branch>
 */
class BranchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $street = $this->faker->streetName();

        return [
            'name' => $street,
            'address' => $street . ' #' . $this->faker->buildingNumber(),
            'phone' => $this->faker->phoneNumber(),
            'email' => $this->faker->email(),
            'working_hours' => '9:00 - 17:00'
        ];
    }
}
