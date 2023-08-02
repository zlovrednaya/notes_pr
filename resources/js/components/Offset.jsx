// frontent/src/components/Home.js
import axios from "axios";
import React, { Component,useState } from "react";
import ReactDOM from 'react-dom';
import PageModel from "./PageModel";
import NotesContent from './NotesContent';



class Offset extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
            count: 1,
            notes:[],
            currentPage:1
        
        };

    };

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
        
        const Notes= this.state.notes.map((note) => (
            
                <NotesContent 
                key={note.id}
                id = {note.id}
                title={note.title}
                link ={'/notes?id = '+note.id}
                created_at={note.created_at}    />
                
                
        ));
    


        return (
        <div>
             <table class="table-elt">
             {Notes}
             </table>
             <span class="span-elt do action-elt" onClick={this.handleDecrement.bind(this)}> &#60;&#60;&#60;			previous page </span>
           {this.state.currentPage}
            <span class="span-elt do action-elt"  onClick={this.handleIncrement.bind(this)}>next page&#62;&#62;&#62;</span>
        </div>
    );
    }
}

export default Offset;