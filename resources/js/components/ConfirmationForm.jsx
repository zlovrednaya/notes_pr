//тут форма подтверждения удаления

import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
//import NotesAdd from './NotesAdd';
import Offset from './Offset';
import NotesContent from './NotesContent';



class ConfirmationForm extends Component {
    constructor(props) {
        super(props);
     

    };

    render() {
        return(
           <div>
            <form  method="post" class="form-left">
                <span>Вы уверены, что хотите удалить заметку?</span>
                <div class="form-elt">
                <button class="btn btn-light" onClick={this.props.confirmAction.bind(this)}>Да</button>
                <button class="btn btn-danger"  onClick={this.props.stopAction.bind(this)}>Нет</button>
                </div>
            </form>
           </div>
   
        )
    };
}



export default ConfirmationForm;