// frontent/src/components/Home.js
import axios from "axios";
import React, { Component,useState } from "react";
import ReactDOM from 'react-dom';
import PageModel from "./PageModel";


class Offset extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
            count: 1
        };

    };

    handleIncrement(params){
        let offset=parseInt(params.currentTarget.getAttribute('offset'));
        offset ++;
    debugger;
        this.setState(() => ({ count: offset }))
    
        this.notifyServer(offset);
    };

   async notifyServer(offset){
        let d = offset;
        const response = await axios.post("http://127.0.0.1:8000/offsetUpdate", {
            data:{offset: offset},
        })
        .then((response) => {
        console.log(response);
        this.setState(() => ({
            notes: response.data.notes,
            currentPage: response.data.offset,
        
        }));
        });

    };

 

    render() {
      //  const Notes = this.state.notes.map(note => (
//			<NotesContent key={note.id} post={note} />
//		));
    

        return (
        <div>
        <span class="span-elt do action-elt" id="offsetEl" onClick={this.handleIncrement}>next page>>></span>
        
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