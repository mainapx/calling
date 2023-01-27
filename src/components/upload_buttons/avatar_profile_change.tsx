import React,{useRef} from 'react';
import './avatar_profile.css';
import {Button} from '@material-ui/core';

const UploadImage = (props) =>{
	const profile_ref = useRef();
    return(
        <Button className='chat-header-buttons' onChange={props.updater} onClick={()=>profile_ref.current.click()}   data-toggle="tooltip" data-placement="top" title={props.tooltip}>
            <label for="profile_upload"><i className={props.type}></i></label>
            <input type="file" accept="image/png, image/gif, image/jpeg"  className="profile_change" ref={profile_ref} name="profile_upload" />
        </Button>
    )
}
export default UploadImage;