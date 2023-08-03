//тут строка таблицы
//с событиями кнопок

import React, { Component,useState } from 'react';
import ReactDOM from 'react-dom/client';
import Offset from './Offset';

function showData(id){
   
    req(id,'shownote');

}

function editData(id){
    debugger;
    req(id,'editnote',true);

}

function delData(id){
   
    req(id,'delnote',true);

}

async function req(id,type,callback){
    
    const response = await axios.post("http://127.0.0.1:8000/"+type, {
        data:{id: id},
    })
    
        .then((response) => {
            if(callback){
                switch(type){
                    case 'editnote':
                        
                    break;
                    case 'delnote':

                    break;

                }
            
            }
        });
    

}





class NotesContent  extends React.Component {

    constructor(props) {
        super(props);
     
        this.state = {
        
         
        };
    

    };

    render() {
        return(
            <tr class="tr-table" key="{props.id}">
                    <td class="inner-table-0"># {this.props.id}</td>
                    <td class="inner-table-1">{this.props.title}</td>
                    <td class="inner-table-2 action-elt" type="button" onClick={showData.bind(this.props.id)}><a class="a-elt" href = {'/note?id='+this.props.id} target="_blank" rel="noreferrer">show</a></td>
                    <td class="inner-table-3 action-elt" data-action="edit" data-value={this.props.id} onClick={this.props.formEditor.bind(this)}>edit</td>
                    <td class="inner-table-4 action-elt" data-value={this.props.id} onClick={this.props.confirmationActionHere.bind(this)}>delete</td>  
            </tr>    
   
        )
    };

}



export default NotesContent;