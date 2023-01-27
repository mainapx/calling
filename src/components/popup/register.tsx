import React from 'react';
import ReactDOM from 'react-dom';

const RegisterPopup = ({message,userClass,textcolor,bgcolor}) =>{
    return(
        <div 
            class={userClass}
			data-aos="fade-down"
            style={{backgroundColor:bgcolor,width:'300px',margin:'0 auto',position:'absolute',right:'0px',color:textcolor}}
            data-aos-duration="500">
                {message}
                <a href="#" onClick={()=>ReactDOM.render("",document.getElementById("user_error"))} style={{position:'absolute',right:'10px',top:'0px'}}><i className='fa fa-close'></i></a>

        </div>
    )
}
export default RegisterPopup;