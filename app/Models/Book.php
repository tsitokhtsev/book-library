<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
    //    use HasFactory;

    protected $fillable = [
        'title',
        'isbn',
        'description',
        'image_cover',
        'language_id',
        'publication_date'
    ];

    protected $casts = [
        'published_at' => 'date',
    ];

    public function language(): BelongsTo
    {
        return $this->belongsTo(Language::class);
    }

    public function authors(): BelongsToMany
    {
        return $this->belongsToMany(Author::class);
    }

    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    public function bookCopies(): HasMany
    {
        return $this->hasMany(BookCopy::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}
