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
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();

//            $table->unsignedBigInteger('user_id');
//            $table->unsignedBigInteger('category_id');
//            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
//            $table->foreign('category_id')->references('id')->on('submission_categories')->onDelete('cascade');
            $table->foreignId('user_id');
            $table->foreignId('submission_category_id')->constrained()->cascadeOnDelete();

            $table->text('title');
            $table->text('content');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};
