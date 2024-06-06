<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function comments(){
        return $this->hasMany(ChallengeComment::class, 'submission_id', 'id');
    }
    public function category(){
        return $this->belongsTo(SubmissionCategory::class, 'submission_category_id', 'id');
    }
}
