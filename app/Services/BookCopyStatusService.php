<?php

namespace App\Services;

use App\Models\BookCopyStatus;
use Exception;

class BookCopyStatusService
{
    /**
     * @param array $data
     *
     * @return BookCopyStatus
     */
    public function createStatus(array $data): BookCopyStatus
    {
        return BookCopyStatus::create($data);
    }

    /**
     * @param array $data
     * @param string $id
     *
     * @return BookCopyStatus
     */
    public function updateStatus(array $data, string $id): BookCopyStatus
    {
        $status = BookCopyStatus::findOrFail($id);
        $status->update($data);

        return $status;
    }
}
