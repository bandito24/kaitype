<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('past_user_votes', function (Blueprint $table) {
//            TODO: use composer require thiagoprz/eloquent-composite-key and use composite primary key instead of this
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('challenge_comment_id')->constrained()->cascadeOnDelete();
            $table->foreignId('submission_id')->constrained()->cascadeOnDelete();
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->tinyInteger('direction');

            $table->index(['user_id', 'submission_id']);
//            DB::statement('ALTER TABLE votes ADD CONSTRAINT chk_direction CHECK (direction IN (1, -1))');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('past_user_votes');
    }
};
