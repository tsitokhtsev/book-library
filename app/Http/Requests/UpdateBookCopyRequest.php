<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBookCopyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'code' => 'required|string|max:255|unique:book_copies,code,' . $this->copy->id,
            'branch_id' => 'required|integer|exists:branches,id',
            'status_id' => 'required|integer|exists:statuses,id',
            'condition_id' => 'required|integer|exists:conditions,id',
        ];
    }
}
