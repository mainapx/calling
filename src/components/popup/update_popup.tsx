import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from '@material-ui/core';
import './update_popup.css';

const Update = (props:any) =>{
    return(
        <div className="alert-black">
            <span>{props.message}</span>
            <Button onClick={()=>ReactDOM.render("",document.getElementById(props.id))}>
                <i className='fa fa-close'></i>
            </Button>
        </div>
    )
}
export default Update;