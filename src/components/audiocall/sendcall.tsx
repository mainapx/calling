import React,{useEffect,useState} from 'react';
import useSound from 'use-sound';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AOS from 'aos';
import './style.css';
//import {AudioConnection} from './audio.js';

const SendCall:React.FC=(props:any)=>{
	const [RefTest]=useSound(props.SoundHandler);
	const [getHeight,setHeight]=useState(window.innerHeight.toString()+"px")
	useEffect(()=>{
		RefTest();
		window.addEventListener('resize',(e)=>{
			setHeight(window.innerHeight.toString()+"px");
		})
	},[]);
	function TestFun(){
		const bb=document.getElementById('audioSend')
		const cc=document.getElementById('navtarget')
		if(bb?.style.display==="block"){
			bb.style.display="none";
			//cc.style.display="block";
		}
	}
	const [getState,setStateHandler]=useState({isPhonePickUp:'fa fa-phone',reverseDisconnect:'',setScroll:'hidden',
		isMinimized:'block',isDisplay:'none'});

	return(
				<React.Fragment>
					{/*<AudioConnection />*/}
					<div 
						className="card send-call-card"
						>
						<div className="card-header caller-headers">


							<Button onClick={TestFun}
								style={{position:'absolute',top:0,right:0,height:'60px',width:'60px',borderRadius:'50%',borderStyle:'none'}}>
								<i className="fa fa-window-minimize" style={{color:'white',fontSize:'25px'}}></i>
							</Button>
						</div>
						<div className="card-body">							
							<div className="caller_details">
								<Avatar style={{backgroundColor:'orange',height:'200px',width:'200px'}}>
									{
										props.profile != '' ?(
											<img src={props.profile} />
										):(
											props.title.toString().charAt(0).toUpperCase()
										)
									}
								</Avatar>
								<h5 style={{color:'white',fontStyle:'fantasy'}}>{props.Name}</h5>
								<h4 style={{color:'white'}}>{props.Status}</h4>
							</div>
						</div>
						<div className="card-footer" 
							style={{padding:0,marginLeft:'auto',marginRight:'auto',right:0,left:0,bottom:0,border:0,backgroundColor:'transparent'}}>
							<ul className="nav" style={{display:'flex',justifyContent:'center'}}>
								{props.forCalling}
								{props.forReceiving}
							</ul>

						</div>
					</div>
				</React.Fragment>
		);
}
export default SendCall