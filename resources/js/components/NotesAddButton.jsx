import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import NotesAdd from './NotesAdd';






class NotesAddButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
           setIsOpen:false
        
        };

    };

    activateAddForm(){

    }

	render() {

		return (
            <span class="span-elt new"><div class="action-elt" onClick={this.activateAddForm}>Добавить заметку</div></span>
        
		);
	}
}
if (document.getElementById('add_part')) {
    const root = ReactDOM.createRoot( document.getElementById('add_part'));
    root.render(<NotesAddButton />);
}


export default NotesAddButton;