import React,{useState} from 'react';
import './style.css';
import {Switch} from '@material-ui/core';
const RenderProfileButton = (props)=>{
    const [isEnabled,setSwitch] = useState(false)
    const [isHide,setHide] = useState("dropdown")
	return(
		
		<li data-toggle="tooltip" data-placement="top" title="settings" className="nav-link d-flex justify-content-center" style={props.myStylesList}>
		<div className="dropdown setting-dropdown" style={{borderRadius:'50%'}}>
			<a className='nav-item pb-0' href="#" data-toggle={isHide}  aria-expanded="false">
				{props.getState != undefined?(
					<img
						src={props.getState?.profile_picture} id="profile-photo" style={{borderRadius:'50%',height:'100%',width:'100%'}}
					/>
				):props.profile != "" ? (
					<img
					src={props.profile} id="profile-photo" style={{borderRadius:'50%',height:'100%',width:'100%'}}
				/>
				):(
					<img
						src={"/dummy/dummy.webp"} id="profile-photo" style={{borderRadius:'50%',height:'100%',width:'100%'}}
					/>
				)}
			</a>
			<div className="dropdown-menu">
				<a className="dropdown-item"  onMouseEnter={()=>setHide("dropdown")} ><i className='fa fa-key'></i>Two Step Verification</a>
				<a className="dropdown-item"  onMouseEnter={()=>setHide("dropdown")}><i className='fa fa-user'></i>Personal Details</a>
				<a className="dropdown-item"  onMouseEnter={()=>setHide("dropdown")}><i className='fa fa-key'></i>Help & Support</a>
				<a className="dropdown-item d-flex align-items-center justify-content-between" onMouseEnter={()=>setHide("close")}><i className='fa fa-sun-o'></i>Dark Mode
                    <Switch
                        disabled={isEnabled}
                    />
                </a>
			</div>
		</div>
		
	</li>
	
	)
}
export default RenderProfileButton;