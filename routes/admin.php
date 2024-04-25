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

        Route::controller(BookController::class)->group(function () {
            Route::get('/books', 'index')->name('books');

            Route::get('/books/add', 'add')->name('books.add');

            Route::post('/books/add', 'save')->name('books.save');
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
