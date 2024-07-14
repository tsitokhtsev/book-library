<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MassUpdateCheckoutRequest extends FormRequest
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
            'member_id' => 'required|integer|exists:users,id',
            'checkouts' => 'required|array',
            'checkouts.*.id' => 'required|integer|exists:checkouts,id',
            'checkouts.*.lost' => 'required|boolean',
            'checkouts.*.damaged' => 'required|boolean',
        ];
    }
}
