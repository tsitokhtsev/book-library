<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookCopyRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'copies.*.code' => 'required|string|unique:book_copies',
            'copies.*.branch_id' => 'required|integer|exists:branches,id',
            'copies.*.status_id' => 'required|integer|exists:statuses,id',
            'copies.*.condition_id' => 'required|integer|exists:conditions,id',
        ];
    }
}
