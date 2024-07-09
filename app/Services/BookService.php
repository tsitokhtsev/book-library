<?php

namespace App\Services;

use App\Models\Book;
use DateTime;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class BookService
{
    /**
     * @param array $data
     *
     * @return Book
     *
     * @throws Exception
     */
    public function createBook(array $data): Book
    {
        return DB::transaction(function () use ($data) {
            if (isset($data['cover_image']) && $data['cover_image'] instanceof \Illuminate\Http\UploadedFile) {
                $path = $data['cover_image']->store('books', 'public');
                $data['cover_image'] = $path;
            }

            $publicationDate = new DateTime($data['publication_date']);

            $book = Book::create([
                ...$data,
                'publication_date' => $publicationDate->format('Y-m-d'),
            ]);

            $book->genres()->sync($data['genres']);
            $book->authors()->sync($data['authors']);

            return $book;
        });
    }


    /**
     * @param array $data
     * @param string $id
     *
     * @return Book
     *
     * @throws Exception
     */
    public function updateBook(array $data, string $id): Book
    {
        return DB::transaction(function () use ($data, $id) {
            $book = Book::findOrFail($id);

            $publicationDate = new DateTime($data['publication_date']);

            $book->update([
                ...$data,
                'publication_date' => $publicationDate->format('Y-m-d'),
            ]);

            $book->genres()->sync($data['genres']);
            $book->authors()->sync($data['authors']);

            return $book;
        });
    }
}
