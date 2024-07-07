<?php

use App\Http\Controllers\Admin\AuthorController;
use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\BookCopyController;
use App\Http\Controllers\Admin\CheckoutController;
use App\Http\Controllers\Admin\ConfigurationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MemberController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\ConditionController;
use App\Http\Controllers\Admin\GenreController;
use App\Http\Controllers\BookCopyStatusController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')
    ->name('admin.')
    ->middleware('auth', 'admin')
    ->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])
            ->name('dashboard');

        Route::resource('members', MemberController::class);

        Route::resource('books', BookController::class);
        Route::post('/books/massDelete', [BookController::class, 'massDelete'])
            ->name('books.massDelete');

        Route::resource('books.copies', BookCopyController::class)
            ->only(['create', 'store', 'update', 'destroy'])
            ->shallow();

        Route::resource('authors', AuthorController::class)
            ->only(['index', 'store', 'update', 'destroy'])->name('index', 'authors');

        Route::resource('genres', GenreController::class)
            ->only(['index', 'store', 'update', 'destroy'])->name('index', 'genres');

        Route::resource('conditions', ConditionController::class)
            ->only(['index', 'store', 'update', 'destroy'])->name('index', 'conditions');

        Route::resource('statuses', BookCopyStatusController::class)
            ->only(['index', 'store', 'update', 'destroy'])->name('index', 'statuses');

        Route::resource('branches', BranchController::class)
            ->only(['index', 'store', 'update', 'destroy'])->name('index', 'branches');

        Route::resource('checkout', CheckoutController::class)
            ->only(['store']);

        Route::get('configuration', [ConfigurationController::class, 'index'])
            ->name('configuration');
        Route::put('configuration', [ConfigurationController::class, 'update'])
            ->name('configuration');
    });
