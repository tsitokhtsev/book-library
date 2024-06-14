<?php

namespace App\Services;

use App\Models\BookCopy;
use Illuminate\Support\Facades\DB;

class BookCopyService
{
    /**
     * @param array $data
     * @param string $bookId
     *
     * @return mixed
     */
    public function createBookCopies(array $data, string $bookId): mixed
    {
        return DB::transaction(function () use ($data, $bookId) {
            $bookCopies = [];

            foreach ($data['copies'] as $copy) {
                $bookCopies[] = BookCopy::create([
                    ...$copy,
                    'book_id' => $bookId,
                ]);
            }

            return $bookCopies;
        });
    }

    /**
     * @param array $data
     * @param string $id
     *
     * @return mixed
     */
    public function updateBookCopy(array $data, string $id): mixed
    {
        return DB::transaction(function () use ($data, $id) {
            return BookCopy::findOrFail($id)->update($data);
        });
    }
}
