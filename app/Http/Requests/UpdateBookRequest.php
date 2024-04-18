<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBookRequest extends FormRequest
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
        $bookId = $this->get('id');

        return [
            'title' => 'required|max:255',
            'isbn' => 'required|max:255|unique:books,isbn,' . $bookId,
            'description' => 'max:455',
            'language' => 'required',
            'publication_date' => 'required|date',
            'genres' => 'array|required',
            'authors' => 'array|required',
            'book_copies' => 'required|array',
            'book_copies.*.condition.name' => 'required|string',
            'book_copies.*.branch.name' => 'required|string',
            'book_copies.*.code' => 'required|string',
        ];
    }
}
