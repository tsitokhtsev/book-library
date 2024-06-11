<?php

namespace App\Services;

use App\Models\BookCopy;
use Illuminate\Support\Facades\DB;

class BookCopyService
{
    /**
     * @param array $data
     * @param string $code
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
