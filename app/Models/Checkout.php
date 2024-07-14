<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Checkout extends Model
{
    protected $fillable = [
        'user_id',
        'book_copy_id',
        'status_id',
        'checkout_date',
        'due_date',
        'return_date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function bookCopy(): BelongsTo
    {
        return $this->belongsTo(BookCopy::class);
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(CheckoutStatus::class);
    }

    public function scopeIsReturned(Builder $query): Builder
    {
        return $query->whereNotNull('return_date');
    }

    public function scopeIsNotReturned(Builder $query): Builder
    {
        return $query->whereNull('return_date');
    }
}
