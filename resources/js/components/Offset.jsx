// frontent/src/components/Home.js
import axios from "axios";
import React, { Component,useState } from "react";
import ReactDOM from 'react-dom';


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

    /*notifyServer(offset){
        let d = offset;
        const response = await axios.post("http://127.0.0.1:8000/offsetUpdate", {
            data:{offset: offset},
        })
        .then((response) => {
        console.log(response);
        this.setState(() => ({
            posts: response.data,
            currentPage: response.data.offset,
            pageCount: response.data.data.posts.last_page
        }));
        });

    };*/

 

    render() {return (
        <span class="span-elt do action-elt" id="offsetEl" offset={this.props.offsetData} onClick={this.handleIncrement.bind(this)}>next page></span>
    );
    }
}

const handleIncrement = (params) => {

    let offset=parseInt(params.currentTarget.getAttribute('offset'));
    offset ++;
    
   const [count,setCount] = useState(0); // initialize state



    notifyServer(offset);
   // getNotesData();
  }

async function getNotesData(pageNum){
    

    try {
        const url = 'http://127.0.0.1:8000/offsetUpdate?page=${pageNum}';
        const response = await axios.post();
       /* this.setState(() => ({
            posts: response.data.notes,
            currentPage: response.data.offset,
        }));*/
      } catch (error) {
        console.log(error);
      }

}



async function notifyServer (offset) {
    let d = offset;
    const response = await axios.post("http://127.0.0.1:8000/offsetUpdate", {
        data:{offset: offset},
    })
    .then((response) => {
      console.log(response);
      this.setState(() => ({
        posts: response.data,
        currentPage: response.data.offset,
        pageCount: response.data.data.posts.last_page
      }));
    });
};

/*function Offset(props) {
    return <span class="span-elt do action-elt" id="offsetEl" offset={props.offsetData} onClick={handleIncrement}>next page></span>;
  }

/*if (document.getElementById('headerLeft')) {
  const root = ReactDOM.createRoot( document.getElementById('headerLeft'));
  root.render(<Home />);
}*/

export default Offset;