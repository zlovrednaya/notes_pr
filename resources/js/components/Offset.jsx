// frontent/src/components/Home.js
import axios from "axios";
import React, { Component } from "react";
import ReactDOM from 'react-dom';

//import { useState } from "react";

/*class Offset extends Component {
  
  render() {
    console.log(432);
    return (
      
        <span class="span-elt do action-elt" id="offsetEl" data-offset="{{$currOffset}}">next page></span>
      
    );
  }
}*/

async function getNotesData(pageNum){
    

    try {
        const url = 'http://127.0.0.1:8000/offsetUpdate?page=${pageNum}';
        const response = await axios.post();
        this.setState(() => ({
            posts: response.data.notes,
            currentPage: response.data.offset,
        }));
      } catch (error) {
        console.log(error);
      }

}

const handleIncrement = (params) => {
    let offset=parseInt(params.currentTarget.getAttribute('offset'));
    offset +=1;

    notifyServer(offset);
    getNotesData();
  }


const notifyServer = (offset) => {
    let d = offset;
    axios.post("http://127.0.0.1:8000/offsetUpdate", {
        data:{offset: offset},
    })
    .then((response) => {
      console.log(response);
    });
};

function Offset(props) {
    return <span class="span-elt do action-elt" id="offsetEl" offset={props.offsetData} onClick={handleIncrement}>next page></span>;
  }

/*if (document.getElementById('headerLeft')) {
  const root = ReactDOM.createRoot( document.getElementById('headerLeft'));
  root.render(<Home />);
}*/

export default Offset;