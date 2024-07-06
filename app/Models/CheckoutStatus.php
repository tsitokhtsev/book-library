<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CheckoutStatus extends Model
{
    protected $fillable = [
        'name',
    ];

    public function checkouts(): HasMany
    {
        return $this->hasMany(Checkout::class);
    }
}
