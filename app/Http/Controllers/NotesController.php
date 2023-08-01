<?php
namespace App\Http\Controllers;
use App\Models\Notes;
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

        $notes = Notes::getNotes();
    
        
        return view('welcome',['notes'=>$notes]);

        //return view('viewproducts', ['allProducts' => $products]);
    }


}