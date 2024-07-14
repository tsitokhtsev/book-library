<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Configuration;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        return Inertia::render('About', [
            'about' => Configuration::where('key', 'about')->first()->value,
            'branches' => Branch::all(),
        ]);
    }
}
