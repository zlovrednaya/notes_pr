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

}
