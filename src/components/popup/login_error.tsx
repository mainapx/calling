import React from 'react';

const Error = ({message}) =>{
    return(
        <div 
            className="alert alert-danger error_msg"
			data-aos="fade-down"
            data-aos-duration="500">
                {message}
        </div>
    )
}
export default Error;