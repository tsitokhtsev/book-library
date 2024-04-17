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
            'authors' => 'array|required'
        ];
    }
}
