// frontent/src/components/Home.js
import axios from "axios";
import React, { Component,useState } from "react";
import ReactDOM from 'react-dom';

import NotesContent from './NotesContent';
import NotesAddButton from './NotesAddButton';
import NotesForm from './NotesForm';
import ConfirmationForm from './ConfirmationForm';


class Offset extends Component {
  
    constructor(props) {
        super(props);

        let offset =0;
        this.state = {
            count: offset,
            notes:[],
            currentPage:1,
            formData:{},
            setIsOpen:false,
            editNote:false,
            
            noteData:[],

            confirmToDeleteForm:false,
            deleteId:false,
            closeDeleteForm:false,
        
            
        
        };

        //первая страничка
        this.notifyServer(offset);
        this.parentHandler = this.parentHandler.bind(this);
        this.formDataCollecter = this.formDataCollecter.bind(this);
        this.formCloser = this.formCloser.bind(this);
        this.formEditor = this.formEditor.bind(this);
        this.confirmationActionHere = this.confirmationActionHere.bind(this);
        this.confirmAction = this.confirmAction.bind(this);
        this.stopAction = this.stopAction.bind(this);

    };


    formDataCollecter(event){
        var formData=this.state.formData;
        let eltName = event.currentTarget.name;
        let eltValue =  event.currentTarget.value;
        formData[eltName] =eltValue;
        this.setState(()=>{
            formData:formData
        });

    }

    formCloser(changeState){
        if(changeState) {
            this.setState(() => ({
                setIsOpen: !this.state.setIsOpen
            }));
            return !this.state.setIsOpen;
        }else{
            if(this.state.setIsOpen){
                return true;
            }else{
                return false;
            }
        }

    }

    confirmationActionHere(event){


        this.setState(() => ({
            confirmToDeleteForm:true,
            deleteId:event.target.getAttribute('data-value')
    
          }));
    }
    async confirmAction(event){
        let id = event.target.getAttribute('data-id');

        const response = await axios.post("http://127.0.0.1:8000/deletenote/submit", {
            data:{id:id},
        })
        .then((response) => {
            console.log(response);
            if(response){
               
                    //обновить списочек - откроем первую страницу
                    this.notifyServer(0);
                    this.setState(() => ({
                        confirmToDeleteForm:false 
                      }
                    ));
              

            
            }
        });
    }

    stopAction(event){

        this.setState(() => ({
            confirmToDeleteForm:false 
    
          }));
    }

    
    async formEditor(event){
        let id = parseInt(event.target.getAttribute('data-value'));
        let action = event.target.getAttribute('data-action');
        this.activateForm({id:id},action);
        
    }

    async activateForm(data,action){
        //пойти на сервер
        //получить данные
        const response = await axios.post("http://127.0.0.1:8000/note", {
            data,
        })
        .then((response) => {
            if(response){
                this.setState(() => ({
                    formData:response.data.note,
                    setIsOpen:true 
                  }
                ));
                //открыть форму
               this.showForm(action);
               
            }
        });
    }


    showForm(action){
        const actionVar=[];
        
        //когданибудь можно сделать универсальным но не сегодня
        this.setState(() => ({
            editNote:true 
          }
        ))
    }


    async getDataRequest(data){
            
        
        const response = await axios.post("http://127.0.0.1:8000/note", {
            data,
        })
        .then((response) => {
            //none
        });

    }

    //связан с NotesAddButton
    async parentHandler(event){
        event.preventDefault();
    
        this.listAjaxRequest('edit',true);

    }  

    
    //обработка запросов на изменение к серверу
    async listAjaxRequest(type,action){
        
        let data = this.state.formData;
        
        const response = await axios.post("http://127.0.0.1:8000/"+type+"note/submit", {
            data,
        })
        .then((response) => {
            console.log(response);
            if(response){
               this.setState(() => ({
                    setIsOpen: false
                }));
                if(action){
                    //обновить списочек - откроем первую страницу
                    this.notifyServer(0);
                }

            
            }
        });

    }

    handleDecrement(params){
      
        let offset = this.state.count ;
        offset--;
            this.setState(() => ({
                  count:offset 
                }));
           
            this.notifyServer(offset);
        };
      

    handleIncrement(params){
      
    let offset = this.state.count ;
    offset++;
        this.setState(() => ({
              count:offset 
            }))
       
        this.notifyServer(offset);
    };

    async notifyServer(offset){
        let d = offset;
        const response = await axios.post("http://127.0.0.1:8000/offsetUpdate", {
            data:{offset: offset},
        })
        .then((response) => {
            console.log(response);
            if(response){
                this.setState(() => ({
                    notes: response.data.notes,
                    currentPage: response.data.offset,
                    count:response.data.offset
                
                }));
                console.log(this.state);
            }
        });

    };


    render() {
        
        const Notes= this.state.notes?this.state.notes.map((note) => (
            
                <NotesContent 
                    key={note.id}
                    id = {note.id}
                    title={note.title}
                    link ={'/notes?id = '+note.id}
                    created_at={note.created_at} 
                    formEditor={this.formEditor}
                    confirmationActionHere={this.confirmationActionHere}
                />
                
                
        )):null;
        let formData = this.state.formData;
        const NoteForm =  (
            
            <NotesForm 
                id={formData.id}
                title={formData.title}
                content={formData.content}
                formDataCollecter={this.formDataCollecter} 
                parentHandler={this.parentHandler} 
                formCloser={this.formCloser}
                closeState={this.formCloser()}
            />
        );

        let confirm = this.state.confirmToDeleteForm;
        const Confirmation =  (
            
            <ConfirmationForm
                confirmAction={this.confirmAction} 
                stopAction={this.stopAction} 
                id={this.state.deleteId}
            />
        );
        




        return (
        <div>
            
             <NotesAddButton 
                parentHandler={this.parentHandler} 
                formDataCollecter={this.formDataCollecter} 
                formCloser={this.formCloser}
                closeState={this.formCloser()}
             />

            {this.state.confirmToDeleteForm && Confirmation}
            {this.state.editNote && NoteForm}
           
             
             <table class="table-elt">
                {Notes}
             </table>
             <div class="pages-elt">
                <span class="span-elt do action-elt" onClick={this.handleDecrement.bind(this)}> &#60;&#60;&#60;	 </span>
                <span class="span-elt do">{this.state.currentPage +1}</span>
                <span class="span-elt do action-elt"  onClick={this.handleIncrement.bind(this)}>&#62;&#62;&#62;</span>
             </div>
        </div>
    );
    }
}

export default Offset;