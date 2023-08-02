<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

/*Route::get('/', function () {
    return view('welcome');
});*/

Route::resource('/', 'App\Http\Controllers\NotesController');
Route::Post('/offsetUpdate','App\Http\Controllers\NotesController@setOffset');
Route::Get('/offsetUpdate','App\Http\Controllers\NotesController@showOffset');

Route::Post('/shownote','App\Http\Controllers\NotesController@redirectNote');
Route::Get('/note','App\Http\Controllers\NotesController@showNote');

Route::Post('/editnote','App\Http\Controllers\NotesController@editNote');
Route::Post('/delnote','App\Http\Controllers\NotesController@delNote');

Route::Post('/editnote/submit','App\Http\Controllers\NotesController@editNoteSubmit');
