<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

class StoreCardRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    public function rules()
    {
        return [
            "card_number" => 'required|string|min:16|max:16',
            'card_expires_date' => ['required', function ($attribute, $value, $fail) {
                $errors = [];
                $exploded_date = explode('/', $value);
                if(Carbon::now()->format('y') > $exploded_date[1]) {
                    $errors[] = "Year cannot be in past";
                }
                if($exploded_date[0] > 12) {
                    $errors[] = 'Wrong month number';
                }
                if (count($errors)) {
                    $fail($errors);
                }
            }],
            "card_cvv" => 'required|string|min:3|max:3',
            "cardholder_name" => 'required'
        ];
    }
}
