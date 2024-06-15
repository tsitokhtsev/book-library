<?php

namespace Database\Seeders;

use App\Enums\RolesEnum;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'email' => 'test@example.com',
            'password' => Hash::make('option123'),
        ])->assignRole(RolesEnum::SUPERADMIN);

        User::factory(30)->create()->each(function ($user) {
            $user->assignRole(RolesEnum::MEMBER);
        });
    }
}
