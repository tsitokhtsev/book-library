<?php

namespace App\Http\Requests;

use App\Models\BookCopy;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'code' => ['required', 'max:255', Rule::unique(BookCopy::class)->ignore($this->request->get('id'))],
            'branch.name' => 'required|string|exists:branches,name',
            'condition.name' => 'required|string|exists:conditions,name',
            'status.name' => 'required|string|exists:statuses,name',
        ];
    }
}
