<?php

namespace App\Services;

use App\Models\Genre;
use Exception;

class GenreService
{
    /**
     * @param array $data
     *
     * @return Genre
     */
    public function createGenre(array $data): Genre
    {
        return Genre::create($data);
    }

    /**
     * @param array $data
     * @param string $id
     *
     * @return Genre
     *
     * @throws Exception
     */
    public function updateGenre(array $data, string $id): Genre
    {
        $genre = Genre::findOrFail($id);
        $genre->update($data);

        return $genre;
    }
}
