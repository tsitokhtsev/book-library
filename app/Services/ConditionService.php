<?php

namespace App\Services;

use App\Models\Condition;
use Exception;

class ConditionService
{
    /**
     * @param array $data
     *
     * @return Condition
     */
    public function createCondition(array $data): Condition
    {
        return Condition::create($data);
    }

    /**
     * @param array $data
     * @param string $id
     *
     * @return Condition
     *
     * @throws Exception
     */
    public function updateCondition(array $data, string $id): Condition
    {
        $condition = Condition::findOrFail($id);
        $condition->update($data);

        return $condition;
    }
}
