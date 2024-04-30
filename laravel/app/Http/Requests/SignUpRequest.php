<?php

namespace App\Http\Requests;

use http\Client\Response;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class SignUpRequest extends FormRequest
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
            'username' => ['required', 'string', 'max:25', 'unique:users,username'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'max:255', 'min:8', 'regex:/^(?=.*[A-Za-z])(?=.*\d).+$/'],
            'confirm_password' => ['same:password', 'required']
        ];
    }

    public function messages(): array
    {
        return [
            'username.required' => 'The username field is required.',
            'username.string' => 'The username must be a string.',
            'username.max' => 'The username must not exceed 25 characters.',
            'email.unique' => 'The email is already taken.',
            'email.email' => 'must be a valid email.',
            'password.min' => 'Your password must be 8 characters and include a number and a letter.',
            'password.regex' => 'Your password must be 8 characters and include a number and a letter.',
            'confirm_password' => 'Your passwords do not match'
        ];
    }
//    protected function failedValidation(Validator $validator)
//    {
//        throw new HttpResponseException(response()->json([
//            'message' => 'Validation failed',
//            'errors' => $validator->errors(),
//        ], 200)); // You can change the status code here
//    }
}
