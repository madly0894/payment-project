<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cards extends Model
{
    use HasFactory;

    const RESPONSES_STATUSES = [
        'success',
        'warn',
        'error'
    ];

    const RESPONSES = [
        'Оплата прошла успешна',
        'Недостаточно средств',
        'Банк отклонил платеж'
    ];

    protected $fillable = [
        'order_id',
        'card_number',
        'card_expires_date',
        'card_cvv',
        'cardholder_name',
    ];
}
