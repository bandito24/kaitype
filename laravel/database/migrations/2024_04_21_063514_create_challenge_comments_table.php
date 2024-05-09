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
        Schema::create('challenge_comments', function (Blueprint $table) {
            $table->id();
            $table->string('content', 500);
            $table->foreignId('submission_id')->constrained()->cascadeOnDelete();
            $table->foreignId('parent_id')->nullable()->constrained('challenge_comments')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->boolean('has_response')->default(false);
            $table->boolean('edited')->default(false);
            $table->integer('votes')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('challenge_comments');
    }
};
