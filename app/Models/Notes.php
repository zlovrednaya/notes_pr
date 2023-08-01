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

    public static function getNotes($limit=false){
       $data =  DB::table(self::$table_class)
        ->select('*')
        ->orderBy('created_at','desc')
        ->get();
        return $data;
    }
    //public static function all(){

    //}

}

