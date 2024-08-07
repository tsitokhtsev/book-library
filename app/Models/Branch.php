<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Branch extends Model
{
    use HasFactory;

    protected $fillable = [
        'is_enabled',
        'name',
        'address',
        'phone',
        'email',
        'working_hours',
    ];

    public function bookCopies(): HasMany
    {
        return $this->hasMany(BookCopy::class);
    }
}
