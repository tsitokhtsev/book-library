<?php

namespace App\Providers;

use App\Models\Configuration;
use Illuminate\Support\ServiceProvider;

class ConfigServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $configurations = Configuration::all();

        foreach ($configurations as $config) {
            config(['library.' . $config->key => $config->value]);
        }
    }
}
