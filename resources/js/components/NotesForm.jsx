//тут форма редактирования

import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
//import NotesAdd from './NotesAdd';
import Offset from './Offset';






class NotesForm extends Component {
    constructor(props) {
        super(props);
        let formData=[];
        formData['title']=props.title;
        formData['content']=props.content;
        this.state = {
            formData,
            changedForm:true,
            setIsOpen:true
         
        };
    

    };

    showCloseForm(){
      
        let state =  this.props.formCloser(true);
         this.setState(() => ({
             setIsOpen: state
           }))
         
     }

    render() {
        return(
            <div>
            <span class="span-elt new"><div class="action-elt" onClick={this.showCloseForm.bind(this)} >Редактировать заметку  {this.state.setIsOpen && (<span>close</span>)}</div></span>
            {(this.state.setIsOpen && this.props.closeState)  && (
                <div class="form-elt">
                    <form  method="post" class="form-left" >
                
                        <input class="form-control pad-top" type="title" name="title" placeholder="Название" defaultValue={this.state.formData.title} onChange={this.props.formDataCollecter.bind(this)} />
                        <input class="form-control pad-top" type="content" name="content" placeholder="Описание"  defaultValue={this.state.formData.content} onChange={this.props.formDataCollecter.bind(this)}  />
                        <button type="submit"  class="btn btn-primary pad-top" onClick={this.props.parentHandler.bind(this)}>Изменить</button>
                    </form>
                </div>
            )}
            
                
            </div>
   
        )
    };
}



export default NotesForm;