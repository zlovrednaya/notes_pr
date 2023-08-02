import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
//import NotesAdd from './NotesAdd';






class NotesAddButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
           setIsOpen:false
        
        };

    };

    activateAddForm(){
        this.setState(() => ({
            setIsOpen:true
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
                    notes: response.data.notes,
                    currentPage: response.data.offset,
                    count:response.data.offset
                
                }));
                console.log(this.state);
            }
        });

      }

	render() {
        const showForm = () => {
            this.state.setIsOpen
          };

		return (
            <div>
                <span class="span-elt new"><div class="action-elt" onClick={this.activateAddForm.bind(this)}>Добавить заметку</div></span>
                {this.state.setIsOpen && (
                    <div class="form-elt">
                <form  method="post" class="form-left" >
            
                    <input class="form-control pad-top" type="title" name="title" placeholder="Название" onChange={this.stTitle.bind(this)}  />
                    <input class="form-control pad-top" type="content" name="content" placeholder="Описание" onChange={this.stContent.bind(this)}  />
                    <button type="submit" onClick={this.handleSubmit.bind(this)}  class="btn btn-primary pad-top" >Добавить</button>
            </form>
            </div>
                )
                }
          </div>
		);
	}
}
if (document.getElementById('add_part')) {
    const root = ReactDOM.createRoot( document.getElementById('add_part'));
    root.render(<NotesAddButton />);
}


export default NotesAddButton;