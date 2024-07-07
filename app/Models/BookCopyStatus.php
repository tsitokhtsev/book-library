<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BookCopyStatus extends Model
{
    protected $fillable = [
        'name',
    ];

    public function bookCopies(): HasMany
    {
        return $this->hasMany(BookCopy::class, 'status_id');
    }
}
