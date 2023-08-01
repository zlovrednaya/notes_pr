import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import {  BrowserRouter as Router,Route, Routes} from "react-router-dom";
import HelloReact from './components/HelloReact';
import Home from "./components/Home";

  class App extends React.Component {
  
   render() {
    return (
      
        <Routes>
          <Route path ="/" element={<Home />} />
        </Routes>
      
    );
   }  

  }



  const root = ReactDOM.createRoot(document.getElementById('body_part'))
  root.render(<React.StrictMode>
    <Router>
      <App params={123} />
      </Router>
    </React.StrictMode>);

/*
тут большие датасеты - поэтому лучше это не делать так
if (document.getElementById('table-react')) {
  
  debugger;
  const thisElement = document.getElementById('table-react');
  const root = ReactDOM.createRoot(thisElement);
  let props = Object.assign({}, thisElement.dataset);
  console.log(props);
 // ReactDOM.createRoot(document.getElementById('table-react')).render(<App list={props.list} />, thisElement);
 root.render(<React.StrictMode>
  <Router>
    <App />
    </Router>
  </React.StrictMode>);
  
}*/
export default App;


