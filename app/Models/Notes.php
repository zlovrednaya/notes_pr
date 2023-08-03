<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;
use DateTime;

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

         return $data[0];
     }

     public static function deleteData($id){
        $DBOperateModel= new DBOperate;
        $DBOperateModel::processData($data,self::$fieldsDBdata);
        DB::table('notes')
        ->where('id',(int)$id)
        ->delete();
        return true;
     }

     public static function submit($data,$update=false){

        $DBOperateModel= new DBOperate;
        $DBOperateModel::processData($data,self::$fieldsDBdata);
        if($update){
            $id = $data['id'];
            DB::table('notes')
            ->where('id',(int)$id)
            ->update(
                [
                    'title' => isset($data['title'])?$data['title']:'', 
                    'content' => isset($data['content'])?$data['content']:'',
                    'created_at' =>$data['created_at'],
                ]
            );
        }else{
       
            $id =$DBOperateModel->checkMaxPrimaryKey(self::$table_class) +1;
            DB::table('notes')->insert(
                [
                    'id'=>$id ,
                    'title' => isset($data['title'])?$data['title']:'', 
                    'content' => isset($data['content'])?$data['content']:'',
                
                    'created_at'=>(new DateTime())->format('Y-m-d H:i:s')
                ]
            );
        }

        
        return self::getNotesById($id);
     }

    //public static function all(){

    //}

}

