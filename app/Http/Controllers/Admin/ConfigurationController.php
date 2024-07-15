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
            'about',
            'days_to_return',
            'max_lent_books',
        ];
        $config = Configuration::whereIn('key', $keys)
            ->get()
            ->pluck('value', 'key');

        return inertia('Admin/Configuration/Index', [
            'about' => $config->get('about'),
            'days_to_return' => $config->get('days_to_return'),
            'max_lent_books' => $config->get('max_lent_books'),
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
            'about' => 'string',
            'days_to_return' => 'integer|min:1',
            'max_lent_books' => 'integer|min:1',
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
