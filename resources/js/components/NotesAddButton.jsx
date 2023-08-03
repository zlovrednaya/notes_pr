//тут чисто обработка кнопки добавить

import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
//import NotesAdd from './NotesAdd';
import Offset from './Offset';





class NotesAddButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
           setIsOpen:false
        
        };

    };


    
    activateAddForm(){
      
       let state =  this.props.formCloser(true);
        this.setState(() => ({
            setIsOpen: state
          }))
        
    }

    stTitle(event){
        this.setState(() => ({
            title:event.target.value
          }))
    }
    stContent(event){
        this.setState(() => ({
            content:event.target.value
          }))
    }

   async handleSubmit(event) {
        event.preventDefault();
        
    
       
    
        const response = await axios.post("http://127.0.0.1:8000/editnote/submit", {
            data:{title: this.state.title,content:this.state.content},
        })
        .then((response) => {
            console.log(response);
            if(response){
               this.setState(() => ({
                setIsOpen: false
                }));

                this.props.updateList();
            
            }
        });

      }

	render() {
        const showForm = () => {
            this.state.setIsOpen
          };
    
		return (
            <div>
                <span class="span-elt new"><div class="action-elt" onClick={this.activateAddForm.bind(this)}>+ Добавить заметку {this.state.setIsOpen && (<span>close</span>)}</div></span>
                {(this.state.setIsOpen && this.props.closeState)  && (
                    <div class="form-elt">
                        <form  method="post" class="form-left" >
                    
                            <input class="form-control pad-top" type="title" name="title" placeholder="Название" onChange={this.props.formDataCollecter.bind(this)}  />
                            <input class="form-control pad-top" type="content" name="content" placeholder="Описание" onChange={this.props.formDataCollecter.bind(this)}  />
                            <button type="submit" onClick={this.props.parentHandler.bind(this)}  class="btn btn-primary pad-top" >Добавить</button>
                        </form>
                    </div>
                )
                }
          </div>
		);
	}
}

export default NotesAddButton;