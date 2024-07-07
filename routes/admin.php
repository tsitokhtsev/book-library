<?php

use App\Http\Controllers\Admin\AuthorController;
use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\BookCopyController;
use App\Http\Controllers\Admin\ConfigurationController;
use App\Http\Controllers\Admin\MemberController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('admin')
    ->name('admin.')
    ->middleware('auth', 'admin')
    ->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('Admin/Dashboard');
        })->name('dashboard');

        Route::resource('members', MemberController::class);

        Route::resource('books', BookController::class);
        Route::post('/books/massDelete', [BookController::class, 'massDelete'])
            ->name('books.massDelete');

        Route::resource('books.copies', BookCopyController::class)
            ->only(['create', 'store', 'update', 'destroy'])
            ->shallow();

        Route::resource('authors', AuthorController::class)
            ->only(['index', 'store', 'update', 'destroy']);

        Route::get('configuration', [ConfigurationController::class, 'index'])
            ->name('configuration.index');
        Route::put('configuration', [ConfigurationController::class, 'update'])
            ->name('configuration.update');
    });
