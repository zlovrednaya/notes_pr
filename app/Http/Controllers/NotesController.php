<?php
namespace App\Http\Controllers;
use App\Models\Notes;
use Illuminate\Http\Request;

class NotesController extends Controller{
    public function create(){
        //return view('welcome');
    }

    public function index()
    {
        //разово добавить в бд услуги
        $DBF = new \App\Models\DBFiller;
        $DBF->upData();

        //получить список заметок

        $offset =1;
        $notes = Notes::getNotes(10,$offset);
    
        
        return view('welcome',['notes'=>$notes,'currOffset'=>$offset]);

    
    }

    //динамически обновляет список для пагинации
    public function setOffset(Request $request){
        $data = $request->data;
        if(isset($data['offset'])){
        $offset=$data['offset'];
        $notes = Notes::getNotes(10,$offset);
        //return json_encode(array('statusCode'=>200));
        //return view('table',['notes'=>$notes,'currOffset'=>$offset])->render();
        $html = view('table', compact('notes'))->render();

        return [
            'status' => "success",
            
            'notes' => $notes,
            'offset' =>$offset
            
        ]; 
       /* return response()->json(
        
            compact('html')
        
        );*/
        }

    }

    public function store(Request $request) 
    {
    	/*$data = $request->validate([
            'offset' => 'required',
        ]);*/

        $data = $request->data;
        if(isset($data['offset'])){
            return self::setOffset($data['offset']);
            return response()->json(['success'=>'setOffset']);
        } else {
            return response()->json(['error'=>'no ajax processing']);
        }
    }


}