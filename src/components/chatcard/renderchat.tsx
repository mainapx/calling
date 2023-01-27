import React,{useState,useEffect,useRef} from 'react';
import './renderchat.css';
import ReactDOM from 'react-dom';
import AOS from 'aos';
import useSound from 'use-sound';
import {Link,navigate} from 'gatsby';
import ChatCard from './renderchat';
import {Button} from '@material-ui/core';
import VideoCall from '../videocall/video';
import {EmojiPicker} from './emojihandler';
import UploadImage from '../upload_buttons/avatar_profile_change';
import Avatar from '@material-ui/core/Avatar';
import io from 'socket.io-client'
import {GetAudioObject} from '../audiocall/audio';
import Send from './send.wav';
import {GetCall} from '../audiocall/audio';
import notification from './notification.wav';
import AdminHandler from '../../pages/admin';
import Update from '../popup/update_popup';
import { HttpImageService } from '../../service/http.service';

function ServerAppender(props){
	const [serverSound]=useSound(notification);
	
	return(
			<>
				<div className="alert alert-light" 
					style={{backgroundColor:'#E99647',color:'black',borderRadius:'360px',
					alignItems:'center',textAlign:'left',display:'inline-block',maxWidth:'500px'}}>
					{props.serverResponse}							
				</div>
				<span>{props.timestamp}</span>
			</>
		);
}



function Senddata(props){
	const [isMsgLoading,setMsgLoading] = useState('spinner-border')
	const [chatAudio]=useSound(Send);

		setTimeout(()=>{
			setMsgLoading('fa fa-check')			
		},600)

		useEffect(()=>{
			props.setBodyRef.current?.scrollTo({top:props.setBodyRef.current?.scrollHeight,behavior:"smooth"})
			if(isMsgLoading == 'fa fa-check'){
				chatAudio()
			}
		},[isMsgLoading])

	return(
		<>
		<div className="alert alert-primary" 
				style={{backgroundColor:'#4B4BFB',borderRadius:'360px',color:'white',
				alignItems:'center',textAlign:'right',display:'inline-block',maxWidth:'500px'}}>
			{props.targetValue}&nbsp;&nbsp;&nbsp;&nbsp;<div className={isMsgLoading} id="spin" style={{height:'20px',width:'20px'}}></div>
		</div>
		<span style={{alignSelf:'flex-end'}}>{props.dateHandler}</span>
		</>		
	)
}

const ENDPOIINT="https://192.168.0.110:8888/audiocall";
const conn=io.connect(ENDPOIINT);

const RenderChat=(props)=>{
	const inputref=useRef();
	const [checkOnlineUsers,setOnlineUsers]=useState([]);
	const [showEmoji,hideEmoji]=useState({isEnabled:false});
	const [connectioncheck,isConnected]=useState(null);
	const [soundEnabled,soundDisabled]=useState(null);
	const setBodyRef=useRef('');
	const [isProfileUploading,setProfileUploading] = useState('fa fa-picture-o')
	const [isAvatarUploading,setAvatarLoading] = useState('fa fa-user')
	const [isLoaderVisible,setLoaderVisible] = useState("none");
	const [getUserStatus,setUserStatus] =  useState("Offline")
	const [getOnline,setOnline] = useState(false)

	const [statusIcon,setStatus]=useState('#9C95AF')
	const [getLocalTime,setLocalTime] = useState('');
	window.localStorage.setItem('Name',props.chathandler)
	const getValueName=window.localStorage.getItem('user_Account_Name')


	useEffect(()=>{


		props.audiovideobutton(false)
		//<VideoCall title={props.chathandler} />
		const p =document.getElementById('videoAppend');
		//<AdminHandler videoRender={p} />
		// props.chat_endpoint.on('online',(data)=>{
		// 	setStatus('#2ECC24')
		// 	setOnline(true)
		// 	setUserStatus("Online")
		
		// });
		props.chat_endpoint.emit('sendDetails',{'authorization':window.localStorage.getItem('authToken'),'ConnectTo':props.chathandler,'Name':getValueName,user_id:localStorage.getItem("user_id"),destination_id:props.destination_id,source_id:window.localStorage.getItem("account_id")})

		props.chat_endpoint.on("get_online_status",(data)=>{
			if(data.data.name ==  props.chathandler){
				setStatus('#2ECC24')
				setUserStatus("Online")
			}
		})

		props.chat_endpoint.on('offline',()=>{
			setStatus('#9C95AF')
			setOnline(false)
			setUserStatus("Offline")
	
		});

		props.chat_endpoint.on("Stop",()=>{
			setLoaderVisible('none')
		})

		props.chat_endpoint.on("fetch_data",(data)=>{
			const listhandler=document.querySelector('#clientdata');
			if(data.data.msg.length > 0){
				data.data.msg.map((user_msg:any)=>{
							if(user_msg.destination_id.toString() == props.destination_id.toString()){
								const get_random_server_id =(Math.random().toString(36)+'00000000000000000').slice(2, 7)
								const server_append = document.createElement("li")
								server_append.setAttribute("class","nav-item")
								server_append.setAttribute("id",get_random_server_id)
								server_append.style.cssText="display:flex;align-self:flex-start;";			 
								listhandler?.append(server_append)
								ReactDOM.createRoot(document.getElementById(get_random_server_id)).render(
									<ServerAppender 
										connection={props.chat_endpoint} 
										serverResponse={user_msg.msg} 
										timestamp={user_msg.updated_at.split(" ")[1].split(".")[0]} />
								)
							}else if(user_msg.source_id.toString() != props.source_id.toString()){
								const newappend = document.createElement("li")
								const get_random_id =(Math.random().toString(36)+'00000000000000000').slice(2, 7)
								newappend.setAttribute("class","nav-item")
								newappend.setAttribute("id",get_random_id)
								newappend.style.cssText="display:flex;align-self:flex-end;";
								listhandler?.append(newappend)			
								ReactDOM.render(<Senddata setBodyRef={setBodyRef} dateHandler={Date().split(" ")[4]} targetValue={user_msg.msg} />,document.getElementById(get_random_id))
								
							}
						
					
				})
			}
			setBodyRef.current?.scrollTo({top:setBodyRef.current?.scrollHeight})
		})

 		props.chat_endpoint.on('PrivateMsg',(data)=>{
			console.log("dest is",props.destination_id)
			setLoaderVisible('none');
			if(props.destination_id.toString() == data.source_id.toString()){
				const server_msg=document.getElementById('clientdata')
				const get_random_server_id =(Math.random().toString(36)+'00000000000000000').slice(2, 7)

				const server_append = document.createElement("li")
				server_append.setAttribute("class","nav-item")
				server_append.setAttribute("id",get_random_server_id)
				server_append.style.cssText="display:flex;align-self:flex-start;";			 
				server_msg.append(server_append)
				ReactDOM.createRoot(document.getElementById(get_random_server_id)).render(
					<ServerAppender connection={props.chat_endpoint}  serverResponse={data.usermsg} timestamp={Date().split(" ")[4]} />
				)
				setBodyRef.current?.scrollTo({top:setBodyRef.current?.scrollHeight,behavior:"smooth"})
			}

 		})
 		props.chat_endpoint.on('online_users',(data)=>{
			data.data.map(users_online=>{
				if(users_online.Name == props.chathandler){
					setOnline(true)
					setStatus('#2ECC24')
					setUserStatus("Online")
				}
			})
			props.chat_endpoint.emit('client_connect_status',{'authorization':window.localStorage.getItem('authToken'),'ConnectTo':props.chathandler,'Name':getValueName,user_id:localStorage.getItem("user_id")})
 		})
 		props.chat_endpoint.on('RecvTyping',(data)=>{
			setBodyRef.current?.scrollTo({top:setBodyRef.current.scrollHeight,behavior:"smooth"})
			setLoaderVisible("block")
 		});
 	},[props.chat_endpoint,props.destination_id]);


	function SetConnection(){
		GetAudioObject(conn)
	}
	SetConnection();

	function ChangeMsg(e){
		if(e.target.value == ""){
			props.chat_endpoint.emit("Stop_typing",{'user_id':window.localStorage.getItem('user_id'),'msg':inputref.current.value,'receiver':props.chathandler,authorization:window.localStorage.getItem("authToken")})
		}else{
			props.chat_endpoint.emit('sendTyping',{'data':'Typing','To':props.chathandler,user_id:window.localStorage.getItem("user_id"),	"authorization":window.localStorage.getItem("authToken")})
		}
	}
	
	const RenderMessage =(e)=>{
		if((inputref.current.value!==''&& e.target.tagName.toLowerCase()==="i")||(e.keyCode===13&&inputref.current.value!=='')){
			const listhandler=document.querySelector('#clientdata');

			ReactDOM.createRoot(document.getElementById('emojishow')).render(null);
			const newappend = document.createElement("li")
			const get_random_id =(Math.random().toString(36)+'00000000000000000').slice(2, 7)
			newappend.setAttribute("class","nav-item")
			newappend.setAttribute("id",get_random_id)
			newappend.style.cssText="display:flex;align-self:flex-end;";
			listhandler?.append(newappend)
			
			if(props.chat_endpoint.emit('ClientMsg',{'user_id':window.localStorage.getItem('user_id'),'msg':inputref.current.value,'receiver':props.chathandler,authorization:window.localStorage.getItem("authToken"),destination_id:props.destination_id,source_id:window.localStorage.getItem("account_id")})){
				const msg = ReactDOM.createRoot(document.getElementById(get_random_id))
				msg.render(<Senddata setBodyRef={setBodyRef} dateHandler={Date().split(" ")[4]} targetValue={inputref.current.value} />)
					inputref.current.value=''
			}
	   		else{
				ReactDOM.createRoot(document.getElementById("errorinput")).render(
					<div className='alert alert-danger' style={{backgroundColor:'black'}}>{"Please Type Messge"}</div>
				)
			};
		}
	};	
	if(props.callingvisible == false){

	
		return(
				<React.Fragment>
					
					<div id="resp"></div>
					<div className="card chat-card-header">
						<div className="card-header input-group navbar" style={{backgroundColor:'#373767'}}>
							<div  style={{justifyContent:'left'}}>
								<div className="input-attach" style={{alignItems:'center',display:'flex',justifyContent:'right'}}>
									<a type="button" 
										onClick={()=>props.setChatView(false)} className="btn btn-default" style={{width:'0px'}} data-toggle="tooltip"
										

									data-placement="top" title="Back">
										<i className="fa fa-arrow-left" style={{fontWeight:'bold',fontSize:'18px',color:'white'}}></i>
									</a>

									&nbsp;&nbsp;&nbsp;
									{props.profile_image==""?(
										<Avatar style={{backgroundColor:'purple'}}>{props.chathandler.toString().charAt(0)}</Avatar>
									):(
										<Avatar style={{backgroundColor:'purple'}} src={props.profile_image}></Avatar>
									)}
									<span href="#" style={{color:'white',fontWeight:'bold'}} className="nav-link">{props.chathandler}&nbsp;&nbsp;<i className="fa fa-circle" style={{color:statusIcon}}></i></span>				
								</div>
							</div>

							<div className="chat-header-right-content">
								<UploadImage 
									tooltip="Change Background" 
									type={isProfileUploading} 
									updater={HttpImageService}
								/>

								<span style={{float:'right',fontWeight:'bold',color:'white'}} id="statususer">
									{getUserStatus}
								</span>
							</div>
						</div>
						<div className="card-body" id="chatbody" ref={setBodyRef}>
							<div id="videoAppend"></div>
							<span style={{width:'fit-content',display:'flex',justifyContent:'center',margin:'0 auto'}} className='alert alert-success'>{getLocalTime}</span>
							<ul className="nav flex-column" id="serverdata" style={{float:'left'}} >
							</ul>
							<ul className="nav flex-column" id="clientdata">
							</ul>
							<div className="spinner-grow text-primary nav-link" style={{display:isLoaderVisible}}></div>
						</div>
						<div className="card-footer">
								<div className="form-handle" style={{display:'flex',alignItems:'center'}}>
								<div className="input-group">
									<div className="input-group-prepend">
										<div className="input-group-text" data-toggle="tooltip" data-placement="top" title="Emoji Select"
											style={{borderLeftTopRadius:'50px',borderLeftBottomRadius:'360px',backgroundColor:'white',
												borderLeftTopRadius:'360px',borderLeftBottomRadius:'360px'
										,padding:0}}>
											<div id="emojishow" style={{position:'absolute',zIndex:500,bottom:'43px'}}></div>
											<a type="button" id="emojibtn" onClick={
													()=>showEmoji.isEnabled==false?hideEmoji({isEnabled:true})||ReactDOM.render(<EmojiPicker targetId={document.getElementById('chatinput')}/>,document.getElementById('emojishow')):showEmoji.isEnabled==true?hideEmoji({isEnabled:false})||ReactDOM.render(null,document.getElementById('emojishow')):''} 
												className="btn btn-default"><i id="smlie" className='fa fa-smile-o'
												style={{color:'#929293',fontSize:'20px',position:'relative'}}
											></i></a>
										</div>
									</div>

									<div className="input-group-prepend">
										<div className="input-group-text" data-toggle="tooltip" data-placement="top" title="File Upload"
											style={{borderLeftTopRadius:'360px',borderLeftBottomRadius:'360px',backgroundColor:'white',
												borderLeftTopRadius:'360px',borderLeftBottomRadius:'360px'
										,padding:0}}>
											<div id="emojishow" style={{position:'absolute',zIndex:500,bottom:'43px'}}></div>
											<label id="emojibtn" for="upload_chat" className="btn btn-default"><i className='fa fa-paperclip' onClick={()=>document.getElementById("upload_file")?.click()}></i></label>
											<input type="file" id="upload_file" hidden name="upload_chat" />
										</div>
									</div>
									
									<div className="input-group-prepend">
										<div className="input-group-text" data-toggle="tooltip" data-placement="top" title="Take Picture"
											style={{borderLeftTopRadius:'360px',borderLeftBottomRadius:'360px',backgroundColor:'white',
												borderLeftTopRadius:'360px',borderLeftBottomRadius:'360px'
										,padding:0}}>
											<div id="emojishow" style={{position:'absolute',zIndex:500,bottom:'43px'}}></div>
											<a type="button" id="emojibtn" 
												className="btn btn-default"><i id="smlie" className='fa fa-camera'
												style={{color:'#929293',fontSize:'20px',position:'relative'}}
											></i></a>
										</div>
									</div>


									
									<span id="errorinput" style={{position:'absolute',zIndex:50}}></span>
									<input connect-id={props.destination_id} onKeyUp={RenderMessage} onChange={ChangeMsg} type="text" ref={inputref} className="form-control" id="chatinput" placeholder="Type a Message..."
										
										emoji-input="unicode" data-emojible="true"	
									/>


								</div>


								<Button  type="button" id="sendbtn" className="btn btn-default" onClick={RenderMessage}>
									<i className='fa fa-paper-plane'></i>
								</Button>
								

							</div>
						</div>
					</div>
					<div id="notification"></div>
				</React.Fragment>
			);
		}
}
export default RenderChat;