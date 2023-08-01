<?php

namespace App\Models;
use DB;


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


class DBFiller extends DB
{
    public $table_class = 'notes';
    public function upData()
    {

        $DBOperateModel= new DBOperate;
        $maxVal = $DBOperateModel->checkMaxPrimaryKey($this->table_class);
    
        while($maxVal<50){
            $maxVal+=1;
            $rand =  rand(-100,100);
            if($rand>=0){
                $mode = '+';
            } else {
                $mode = '-';
            }
            $rand=abs($rand);
            
            DB::table('notes')->insert(
                [
                    'id'=>$maxVal,
                    'title' => "note {$rand}", 
                    'content' => 'hey notes',
                
                    'created_at'=>DB::raw("date_trunc('hour', CURRENT_TIMESTAMP {$mode} interval '{$rand} hour')")
                ]
            );
          

        }
        

    }
}
