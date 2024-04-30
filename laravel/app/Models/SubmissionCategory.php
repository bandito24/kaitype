<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubmissionCategory extends Model
{

    use HasFactory;

    protected $guarded = [];


    public function submissions(){
        return $this->hasMany(Submission::class, 'submission_category_id', 'id');
    }
}
