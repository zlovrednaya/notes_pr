<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;

class Notes extends Model {
    public static $table_class='notes';
    protected $fillable = [
       'title',
       'content',
       'created_at',
       'description',
    ];

    public static function getNotes($limit=false,$offset=1){
       $data =  DB::table(self::$table_class)
        ->select('*')
        ->orderBy('created_at','desc')
        ->limit(($limit)?$limit:false)
        ->offset($offset*$limit)
        ->get();
        return $data;
    }
    //public static function all(){

    //}

}

