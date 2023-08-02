import React from 'react';

function showData(id){
    debugger;
    req(id);

}

async function req(id){
    
        const response = await axios.post("http://127.0.0.1:8000/shownote", {
            data:{id: id},
        })
        .then((response) => {
            console.log(response);
            if(response){
               
                console.log(response);
            }
        });

}
const NotesContent = (props) => (
  
    <tr class="tr-table" key="{props.id}">
                    <td class="inner-table-0"># {props.id}</td>
                    <td class="inner-table-1">{props.title}</td>
                    <td class="inner-table-2 action-elt" type="button" onClick={showData.bind(this,props.id)}><a href = {'/note?id='+props.id} target="_blank" rel="noreferrer">show</a></td>
                    <td class="inner-table-3 action-elt">edit</td>
                    <td class="inner-table-4 action-elt">delete</td>
                
     </tr>    

);

export default NotesContent;