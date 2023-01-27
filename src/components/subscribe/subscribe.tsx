import React from 'react';
import { Button } from '@material-ui/core';

const SubscribeForm:React.FC= () =>{
    return(
        <>
            <div className="subscribe-form mr-auto">
                <div className="form-group d-flex justify-content-between align-item-center w-90">
                    <input type="email" className="form-control" placeholder="Enter your mail" />
                    <Button style={{backgroundColor:'orange',}} variant="outlined">Subscribe</Button>                    
                </div>
            </div>
        </>
    )
}
export default SubscribeForm;