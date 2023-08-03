// frontent/src/components/Home.js
import axios from "axios";
import React, { Component,useState } from "react";
import ReactDOM from 'react-dom';

import NotesContent from './NotesContent';
import NotesAddButton from './NotesAddButton';




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
         
        
        };

        //первая страничка
        this.notifyServer(offset);

        this.parentHandler = this.parentHandler.bind(this);
        this.formDataCollecter = this.formDataCollecter.bind(this);
        this.formCloser = this.formCloser.bind(this);



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

    async parentHandler(event){
        event.preventDefault();
    
        let data = this.state.formData;
        const response = await axios.post("http://127.0.0.1:8000/editnote/submit", {
            data,
        })
        .then((response) => {
            console.log(response);
            if(response){
               this.setState(() => ({
                    setIsOpen: false
                }));
                //обновить списочек - откроем первую страницу
                this.notifyServer(0);

            
            }
        });

    }  

    handleDecrement(params){
      
        let offset = this.state.count ;
        offset--;
            this.setState(() => ({
                  count:offset 
                }))
           
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
                />
                
                
        )):null;

    
    


        return (
        <div>
            
             <NotesAddButton 
                parentHandler={this.parentHandler} 
                formDataCollecter={this.formDataCollecter} 
                formCloser={this.formCloser}
                closeState={this.formCloser()}
             />
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