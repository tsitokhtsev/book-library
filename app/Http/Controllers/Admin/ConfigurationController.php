<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Configuration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Response;

class ConfigurationController extends Controller
{
    /**
     * @return Response
     */
    public function index(): Response
    {
        $keys = [
            'days_to_return',
            'max_length_books',
            'about'
        ];
        $config = Configuration::whereIn('key', $keys)
            ->get()
            ->pluck('value', 'key');

        return inertia('Admin/Configuration/Index', [
            'days_to_return' => $config->get('days_to_return'),
            'max_length_books' => $config->get('max_length_books'),
            'about' => $config->get('about'),
        ]);
    }

    /**
     * @param Request $request
     *
     * @return RedirectResponse
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'days_to_return' => 'integer|min:1',
            'max_length_books' => 'integer|min:1',
            'about' => 'string',
        ]);

        DB::transaction(function () use ($validated) {
            foreach ($validated as $key => $value) {
                Configuration::updateOrCreate(
                    ['key' => $key],
                    ['value' => $value]
                );
            }
        });

        return redirect()
            ->route('admin.configuration.index')
            ->with('success', 'Configuration updated successfully.');
    }
}
