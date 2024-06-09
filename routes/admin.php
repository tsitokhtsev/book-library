<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\BookCopyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('admin')
    ->name('admin.')
    ->middleware('auth', 'admin')
    ->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('Admin/Dashboard');
        })->name('dashboard');

        Route::resource('books', BookController::class)
            ->only(['index', 'create', 'store']);

        Route::controller(BookController::class)->group(function () {
            Route::post('/books/delete', 'destroy')->name('books.delete');

            Route::post('/books/edit', 'update')->name('books.edit');
            Route::post('/books/massDelete', 'massDelete')->name('books.massDelete');

            Route::get('/books/show/{isbn}', 'show')->name('books.show');
        });

        Route::controller(BookCopyController::class)->group(function () {
            Route::post('/book/edit/{code}', 'update')->name('book.edit');
            Route::post('/book/delete/{code}', 'destroy')->name('book.delete');
        });
    });
