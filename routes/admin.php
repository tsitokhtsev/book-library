<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('admin/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['admin'])->name('admin-dashboard');
