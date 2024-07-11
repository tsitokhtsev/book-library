<?php

namespace App\Services;

use App\Models\Author;
use Exception;
use Illuminate\Http\UploadedFile;

class AuthorService
{
    /**
     * @param array $data
     *
     * @return Author
     */
    public function createAuthor(array $data): Author
    {
        if (isset($data['cover_image']) && $data['cover_image'] instanceof UploadedFile) {
            $path = $data['cover_image']->store('authors', 'local');
            $data['cover_image'] = $path;
        }

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

        if (isset($data['cover_image']) && $data['cover_image'] instanceof UploadedFile) {
            $path = $data['cover_image']->store('authors', 'public');
            $data['cover_image'] = $path;
        }

        $author->update($data);

        return $author;
    }
}
