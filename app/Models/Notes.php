<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;

class Notes extends Model {
    public static $fieldsDBdata=[
        'title'=>'string',
        'content'=>'string',
        'id'=>'int',
        'created_at'=>'datetime'
    ];
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
    public static function getNotesById($id){
        $data =  DB::table(self::$table_class)
         ->select('*')
         ->where('id',(int)$id)
         ->get();
         return $data;
     }

     public static function submit($data){



        $DBOperateModel= new DBOperate;
        $DBOperateModel::processData($data,self::$fieldsDBdata);
        $nextVal =$DBOperateModel->checkMaxPrimaryKey(self::$table_class) +1;
        DB::table('notes')->insert(
            [
                'id'=>$nextVal ,
                'title' => $data['title'], 
                'content' => $data['content'],
            
                'created_at'=>DB::raw("date_trunc('hour', CURRENT_TIMESTAMP)")
            ]
        );
        return $nextVal;
     }

    //public static function all(){

    //}

}

