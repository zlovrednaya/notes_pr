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
            
                <span class="span-elt">Вы уверены, что хотите удалить заметку?</span>
                <div class="form-elt">
                <button type="submit" class="btn btn-light" data-id={this.props.id} onClick={this.props.confirmAction.bind(this)}>Да</button>
                <button type="submit" class="btn btn-danger" onClick={this.props.stopAction.bind(this)}>Нет</button>
               </div>
           </div>
   
        )
    };
}



export default ConfirmationForm;