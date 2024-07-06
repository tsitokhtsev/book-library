<?php

namespace Database\Seeders;

use App\Enums\Condition;
use Illuminate\Database\Seeder;

class ConditionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (Condition::cases() as $condition) {
            \App\Models\Condition::create(['name' => $condition]);
        }
    }
}
