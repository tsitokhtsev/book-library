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
        return inertia('Admin/Configuration/Index', [
            'days_to_return' => config('library.days_to_return'),
            'max_lent_books' => config('library.max_lent_books'),
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
            'days_to_return' => 'required|integer|min:1',
            'max_lent_books' => 'required|integer|min:1',
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
