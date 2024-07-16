<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Book;
use App\Models\BookCopy;
use App\Models\Branch;
use App\Models\Genre;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
        ]);

        foreach ($this->getGenres() as $genre) {
            Genre::create(['name' => $genre]);
        }

        Author::factory(rand(20, 30))->create();
        Branch::factory(5)->create();

        Book::factory(rand(20, 30))
            ->create()
            ->each(function ($book) {
                $book->genres()->attach(Genre::all()->random(rand(1, 3)));
                $book->authors()->saveMany(Author::all()->random(rand(1, 3)));
                $book->bookCopies()->saveMany(BookCopy::factory(rand(1, 10))->make());
            });
    }

    private function getGenres(): array
    {
        return [
            'Fiction',
            'Non-Fiction',
            'Science Fiction',
            'Fantasy',
            'Mystery',
            'Thriller',
            'Romance',
            'Horror',
            'Biography',
            'Autobiography',
            'Self-Help',
            'Cookbook',
            'Travel',
            'History',
            'Science',
            'Mathematics',
            'Philosophy',
            'Religion',
            'Art',
            'Music',
            'Sports',
            'Comics',
            'Graphic Novel',
            'Poetry',
            'Drama',
            'Classic',
            'Children',
            'Young Adult',
        ];
    }
}
