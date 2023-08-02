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

    handleIncrement(params){
       // let offset=parseInt(params.currentTarget.getAttribute('offset'));
       // offset ++;
      
    debugger;
    let offset = this.state.count ;
        this.setState(() => ({
              count:offset++ 
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
                    count:response.data.offset+1
                
                }));
                console.log(this.state);
            }
        });

    };


    render() {
        /*if(this.state.notes){
            const Notes2 = this.state.notes.map((note) => (
                <div>wewer</div>
            ));
           
        } else{
            const Notes2 = "";
        }*/

        const Notes= this.state.notes.map((note) => (
            <div>
                 <table class="table-elt">
                <NotesContent
                id = {note.id}
                title={note.title}
                created_at={note.created_at}    />
                </table>
                </div>
        ));
        const NotesContent2 = (props) => (
            <div>hahaha </div>
          );
    

        return (
        <div>
             {Notes}
           
            <span class="span-elt do action-elt" id="offsetEl" onClick={this.handleIncrement.bind(this)}>next page>>></span>
        </div>
    );
    }
}
/*
if (document.getElementById('react-pagination-button')) {
	ReactDOM.render(
        <span class="span-elt do action-elt" id="offsetEl" onClick={Offset.handleIncrement}>next page>></span>,
		document.getElementById('react-pagination-button')
	);
}*/





/*function Offset(props) {
    return <span class="span-elt do action-elt" id="offsetEl" offset={props.offsetData} onClick={handleIncrement}>next page></span>;
  }

/*if (document.getElementById('headerLeft')) {
  const root = ReactDOM.createRoot( document.getElementById('headerLeft'));
  root.render(<Home />);
}*/

export default Offset;