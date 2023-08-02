<?php

namespace App\Models;
use DB;


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DBOperate extends DB
{
    public function checkMaxPrimaryKey($table){
        
        $valId =
         DB::table($table)
            //->select('id')
            ->orderBy('id','desc')
            ->limit(1)
            ->first();
        return $valId->id;
    }

    public static function processData(&$data,$schema){

        if(is_array($data)){
            foreach($data as $key=>&$d){
                if(isset($schema[$key])){
                    switch($schema[$key]){
                        case 'int':
                            $d=(int)$d;
                            break;
                        case 'string':
                                $d=str_replace('DROP TABLE','',$d);
                                $d = addslashes($d);
                            break;

                    }
                }
                
            }
        }
    }

}
