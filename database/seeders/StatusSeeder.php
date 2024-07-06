<?php

namespace Database\Seeders;

use App\Enums\BookCopyStatus;
use App\Enums\CheckoutStatus;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (BookCopyStatus::cases() as $status) {
            \App\Models\BookCopyStatus::create([
                'name' => $status,
            ]);
        }

        foreach (CheckoutStatus::cases() as $status) {
            \App\Models\CheckoutStatus::create([
                'name' => $status,
            ]);
        }
    }
}
