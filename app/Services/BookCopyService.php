<?php

namespace App\Services;

use App\Models\Book;
use App\Models\BookCopy;
use App\Models\Branch;
use App\Models\Condition;
use App\Models\Status;

class BookCopyService
{
    /**
     * @param array $data
     * @param string $code
     *
     * @return mixed
     */
    public function updateBookCopy(array $data, string $code): mixed
    {
        return BookCopy::where('code', $code)
            ->update([
                'code' => $data['code'],
                'branch_id' => Branch::where('name', $data['branch']['name'])->first()->id,
                'condition_id' => Condition::where('name', $data['condition']['name'])->first()->id,
                'status_id' => Status::where('name', $data['status']['name'])->first()->id
            ]);
    }
}
