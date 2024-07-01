<?php

namespace App\Services;

use App\Models\Author;
use Exception;

class AuthorService
{
    /**
     * @param array $data
     *
     * @return Author
     */
    public function createAuthor(array $data): Author
    {
        return Author::create($data);
    }

    /**
     * @param array $data
     * @param string $id
     *
     * @return Author
     *
     * @throws Exception
     */
    public function updateAuthor(array $data, string $id): Author
    {
        $author = Author::findOrFail($id);
        $author->update($data);

        return $author;
    }
}
