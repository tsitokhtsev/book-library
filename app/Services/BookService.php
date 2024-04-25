<?php

namespace App\Services;

use App\Models\Book;
use App\Models\BookCopy;
use App\Models\Branch;
use App\Models\Condition;
use App\Models\Language;
use App\Models\Status;
use DateTime;
use Exception;

class BookService
{
    /**
     * @param array $data
     *
     * @return Book
     *
     * @throws Exception
     */
    public function createBook(array $data): Book {
        $publicationDate = new DateTime($data['publication_date']);

        $book = Book::create([...$data,
            'publication_date' => $publicationDate->format('Y-m-d'),
            'language_id' => Language::where('name', $data['language'])->first()->id
        ]);

        $book->genres()->sync(array_column($data['genres'], 'id'));
        $book->authors()->sync(array_column($data['authors'], 'id'));

        foreach ($data['book_copies'] as $book_copy) {
            BookCopy::create([
                'code' => $book_copy['code'],
                'book_id' => $book->id,
                'branch_id' => Branch::where('name', $book_copy['branch'])->first()->id,
                'condition_id' => Condition::where('name', $book_copy['condition'])->first()->id,
                'status_id' => Status::where('name', $book_copy['status'])->first()->id
            ]);
        }

        return $book;
    }

    /**
     * @param array $data
     * @param string $id
     *
     * @return Book
     *
     * @throws Exception
     */
    public function updateBook(array $data, string $id): Book {
        $book = Book::firstOrFail('id', $id);

        $publicationDate = new DateTime($data['publication_date']);

        $book->update([...$data,
            'publication_date' => $publicationDate->format('Y-m-d'),
            'language_id' => Language::where('name', $data['language']['name'])->first()->id
        ]);

        $book->genres()->sync(array_column($data['genres'], 'id'));
        $book->authors()->sync(array_column($data['authors'], 'id'));

        foreach ($data['book_copies'] as $book_copy) {
            BookCopy::create([
                'code' => $book_copy['code'],
                'book_id' => $book->id,
                'branch_id' => Branch::where('name', $book_copy['branch']['name'])->first()->id,
                'condition_id' => Condition::where('name', $book_copy['condition']['name'])->first()->id,
                'status_id' => Status::where('name', $book_copy['status']['name'])->first()->id,
            ]);
        }

        return $book;
    }
}
