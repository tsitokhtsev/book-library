<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveBookRequest extends FormRequest
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
            'title' => 'required|max:255',
            'isbn' => 'required|max:255|unique:books',
            'description' => 'max:455',
            'language' => 'required',
            'publication_date' => 'required|date',
            'genres' => 'array|required',
            'authors' => 'array|required',
            'book_copies' => 'required|array',
            'book_copies.*.condition.name' => 'required|string|exists:conditions,name',
            'book_copies.*.branch.name' => 'required|string|exists:branches,name',
            'book_copies.*.status.name' => 'required|string|exists:statuses,name',
            'book_copies.*.code' => 'required|string|unique:book_copies,code'
        ];
    }
}
