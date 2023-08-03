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

    //данные по заметке
    public function redirectNote(Request $request){
        $data = $request->data;
        if(isset($data['id'])){
        return redirect()->away('http://127.0.0.1:8000/note?id='.$data['id'])->with('_blank');
        }
        
    }

    public function revealId($request){
        $id = $request->id;
        if(!$id){
            $request_data = $request->data;
            if(isset( $request_data['id'])){
                $id =  $request_data['id'];
            }
        }
        return $id;
    }

    public function getNote(Request $request){
        $id = $this->revealId($request);
        if($id){
            $note = Notes::getNotesById($id);
            return [
                'status'=>'success',
                'note'=> $note
            ];
        }else{
            return [
                'status' => "false",
                'error'=>'нет данных'
            ];
        }
    }

    public function showNote(Request $request){
        $id = $this->revealId($request);
        if($id){
            $note = Notes::getNotesById($id);
            return view('noteshow',['note'=>$note]);
        }else{
            return [
                'status' => "false",
                'error'=>'нет данных'
            ];
        }
    
        
    }

    public function editNote(Request $request){
        $data = $request->data;
        if(isset($data['id'])){
            return [
                'status'=>'success',
                'note'=> Notes::getNotesById($data['id'])[0]
            ];
        }else{
            return [
                'status' => "false",
                'error'=>'нет данных'
            ];
        }
        
    }

    // можно работать с add и edit
    //определяем по наличию или отсуствию id
    public function editNoteSubmit(Request $request){
        $data = $request->data;
    
        
        if(!isset($data['id'] )){
            //edit
            $update = false;
            
        }else{
             //add
            $update = true;
        }

        $note = Notes::submit($data,$update);
        if( $note){
            return [
                'status'=>'success',
                'note'=>$note
            ];
        } else{
            return [
                'status' => "false",
                'error'=>'данные не обновлены'
            ];
        }
        
    }

    public function deleteNoteSubmit(Request $request){
        $data = $request->data;
        if(isset($data['id'])){

            Notes::deleteData($data['id']);
        }
        return [
            'status'=>'данные удалены',
            'id'=>$data['id']
        ];

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