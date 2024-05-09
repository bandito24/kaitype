<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChallengeComment extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }
    public function parent(){
        return $this->belongsTo('App\Models\ChallengeComment', 'parent_id', 'id');
    }
//    public function retrieveChildren(){
//        $children = ChallengeComment::where(['parent_id', $this->id])->get();
//        if($children) return $children;
//        return null;
//    }
    public function children(){
        return $this->hasMany('App\Models\ChallengeComment', 'parent_id', 'id');
    }

}
