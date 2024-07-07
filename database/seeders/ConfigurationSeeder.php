<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ConfigurationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $configurations = config('library');

        foreach ($configurations as $key => $value) {
            \App\Models\Configuration::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }
    }
}
