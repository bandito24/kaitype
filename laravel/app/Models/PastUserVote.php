<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PastUserVote extends Model
{
//    protected $primaryKey = ['user_id', 'challenge_comment_id']; // Specify the composite key
//    public $incrementing = false; // Disable auto-incrementing
    public $timestamps = false;
    use HasFactory;
    protected $guarded = [];
}
