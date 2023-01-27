import React,{useRef,useState,useEffect} from 'react';
import ReactDOM from 'react-dom'
import ReceiveCall from './receivecall';
import Peer from 'simple-peer';
import io from 'socket.io-client';


let conn;
const GetAudioObject=(socketobj)=>{
	conn=socketobj;
}
let x=GetAudioObject()

function GetCall({conn}){
	useEffect(()=>{
		conn.on('GetCall',(data)=>{
			ReactDOM.render(<ReceiveCall />,document.getElementById('videochatrender'));	
		 })
	},[]);
	return null;
}
const AudioConnection=()=>{
	const [getAudioID,setAudioID]=useState();
	const [isCallAccepted,setCallAccepted]=useState(false);
	const setAudioRef=useRef();
	const [getRemoteUser,setRemoteUser]=useState();
	const setRemoteAudio=useRef();
	const [getFrom,setFrom]=useState();

	navigator.mediaDevices.getUserMedia({video:false,audio:true}).then(stream=>{
		setAudioRef.current.srcObject=stream;
	})

	useEffect(()=>{
		conn.emit('getAudioDetail',{'data':window.localStorage.getItem('authToken'),'connectTo':window.localStorage.getItem('Name'),'ownName':window.localStorage.getItem('user_Account_Name')})

			conn.on('ReceiveID',(id)=>{
				setAudioID(id);
			})
			conn.on('ReceiveUser',(user)=>{
				console.log(user);
				setRemoteUser(user.usernameID);
			})
				const AudioCall=new Peer({
					initiator:true,
					trickle:false,
					stream:setAudioRef.current
				})
				AudioCall.on('signal',(data)=>{
					conn.emit("CallUser",{userToCall:getRemoteUser,signaldata:data,from:getAudioID})
					ReactDOM.render(<GetCall />,document.getElementById('resp'));
				})
				
				AudioCall.on('stream',(stream)=>{
					setRemoteAudio.current.srcObject=stream;
				})
		 		conn.on('CallAccepted',(signal)=>{
					AudioCall.signal(signal)
					setCallAccepted(true)
				})
		},[])
		
	
	return null;
}
export {AudioConnection,GetAudioObject,GetCall};