<?php

namespace App\Http\Requests;

use App\Models\Book;
use App\Rules\UniqueBookCopyCodeRule;
use Illuminate\Contracts\Validation\ValidationRule;
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
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|max:255',
            'isbn' => ['required', 'max:255', Rule::unique(Book::class)->ignore($this->request->get('id'))],
            'description' => 'max:455',
            'language' => 'required',
            'publication_date' => 'required|date',
            'genres' => 'array|required',
            'authors' => 'array|required',
            'book_copies' => ['required', new UniqueBookCopyCodeRule],
        ];
    }
}
