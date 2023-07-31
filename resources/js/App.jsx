import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import {  BrowserRouter as Router,Route, Routes} from "react-router-dom";
import HelloReact from './components/HelloReact';
import Home from "./components/Home";
import Login from './components/Forms/Login';
//import GetStarted from './Forms/Login';
import Register from './components/Forms/Register';
/*class App extends Component {
  render() {
      return (
        <div>
          <Routes>
          
                <Route path="/" component={Home}/>
                <Route path="/login" component={Login}/>
            
          </Routes>
        </div>
      );
      }
  }
  
  export default App;*/


  class App extends React.Component {
   // const navigate = useNavigate();
   render() {
    return (
      
        <Routes>
        <Route path ="/" element={<HelloReact />} />
        <Route path ="login" element={<Login />} />
        <Route path ="register" element={<Register />} />
        </Routes>
      
    );
   }
    
    
    /*render() {
        return (
            <div className='app'>
                <header className='header'>
                    1233
                </header>
                <main className='main'>
                    456
                </main>
            </div>
        );
    }*/
  }

 //renders to body

  const root = ReactDOM.createRoot(document.getElementById('body_part'))
  root.render(<React.StrictMode>
    <Router>
      <App />
      </Router>
    </React.StrictMode>);
export default App;

