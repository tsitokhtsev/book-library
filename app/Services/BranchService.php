<?php

namespace App\Services;

use App\Models\Branch;
use Exception;

class BranchService
{
    /**
     * @param array $data
     *
     * @return Branch
     */
    public function createBranch(array $data): Branch
    {
        return Branch::create($data);
    }

    /**
     * @param array $data
     * @param string $id
     *
     * @return Branch
     */
    public function updateBranch(array $data, string $id): Branch
    {
        $branch = Branch::findOrFail($id);
        $branch->update($data);

        return $branch;
    }
}
