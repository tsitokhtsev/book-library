<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'isbn' => 'required|string|max:255|unique:books',
            'description' => 'nullable|string|max:500',
            'publication_date' => 'required|date',
            'language_id' => 'required|integer|exists:languages,id',
            'genres' => 'required|array',
            'genres.*' => 'integer|exists:genres,id',
            'authors' => 'required|array',
            'authors.*' => 'integer|exists:authors,id',
            'cover_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }
}
