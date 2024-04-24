<?php

namespace App\Rules;

use App\Models\BookCopy;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class UniqueBookCopyCodeRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param string $attribute
     * @param mixed $value
     * @param Closure(string): PotentiallyTranslatedString $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        foreach ($value as $copy) {
            if (BookCopy::where('code', $copy['code'])->exists()) {
                $fail('The book copies code must be unique.');
            }
        }
    }
}
