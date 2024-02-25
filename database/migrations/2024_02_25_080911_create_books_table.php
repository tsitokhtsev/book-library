<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->boolean('enabled')->default(true);
            $table->string('title');
            $table->string('isbn');
            $table->string('description')->nullable();
            $table->date('publication_date');
            $table->string('cover_image')->nullable();
            $table->string('author_id');
            $table->string('language_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
