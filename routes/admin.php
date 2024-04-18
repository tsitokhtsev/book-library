<?php

use App\Http\Controllers\BookController;
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

            Route::post('/book/add', 'save')->name('books.save');
            Route::post('/book/delete', 'destroy')->name('books.delete');

            Route::post('/book/edit', 'update')->name('books.edit');
            Route::post('/books/delete', 'massDelete')->name('books.massDelete');


            Route::get('/book/show/{isbn}', 'show')->name('books.show');
        });
    });
