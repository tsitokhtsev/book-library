<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Configuration;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $keys = [
            'days_to_return',
            'max_length_books',
            'about'
        ];
        $config = Configuration::whereIn('key', $keys)
            ->get()
            ->pluck('value', 'key');

        return Inertia::render('About', [
            'about' => $config->get('about'),
            'branches' => Branch::all()
        ]);
    }
}
