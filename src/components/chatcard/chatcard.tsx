import React,{useEffect,useState,useRef} from 'react';
import ReactCSSTransitionGroup from 'react-transition-group';
import ReactDOM from 'react-dom/client';
import RenderChat from './renderchat';
import Avatar from '@material-ui/core/Avatar';
import ConnectVideo from '../videocall/webcam';	
import './chatcard.css';
import io from 'socket.io-client'
import {HttpAccountService} from '../../service/http.service';
import VideoCall from '../videocall/video';
import CircularProgress from '@material-ui/core/CircularProgress';

export const contextHandler=React.createContext();

const ChatCard=(props)=>{
	const [getUsers,setUsers]=useState({data:null});
	const bodyref=useRef();
	const [showChat,setChat] = useState(false)
	const [getTitle,setTitle] = useState('')
	const [getUserToConnectID,setUserToConnectID] = useState("")
	const [getProfile,setProfile] = useState("")
	const [getInterfaceId,setInterfaceId] = useState("")
	const [get_chat_endpoint,set_chat_endpoint] = useState(null)
	const [account_ref] = useRef()
	const [checkLoad,setLoad]=useState(<CircularProgress />)

	useEffect(()=>{
		HttpAccountService("users",{'x-userid':localStorage.getItem("user_id"),authorization:window.localStorage.getItem('authToken'),'Video-Email':window.localStorage.getItem('email')},'GET').then(response=>{
			setUsers(response);			
			setLoad('');
		}).then(()=>{
			if(get_chat_endpoint == null){				
				alert()
				const endpoint =io.connect(`https://192.168.0.110:8888/chat`)
				set_chat_endpoint(endpoint)
			}
		})	

	},[props.switchToUsers,showChat,getUserToConnectID,set_chat_endpoint]);

	function SetDetailsForRender(user_data){
		setUserToConnectID(user_data.account_id)
		props.user_profile(user_data.profile_image)
		setTitle(user_data.firstname)
		setChat(true)
		setProfile(user_data.profile_picture)
	}

	if(showChat == true && props.users==false){
		return(
			<RenderChat 
				chat_endpoint={get_chat_endpoint} 
				switchToUsers={props.switchToUsers} 
				chathandler={getTitle} 
				source_id={window.localStorage.getItem('account_id')}
				setChatView={setChat}
				callingvisible={false}
				audiovideobutton={props.audiovideobutton}
				destination_id={getUserToConnectID} 
				profile_image={getProfile} 
			/>
		)
	}else{
		return(
			<div className="card" id="chatcard">
				<div className="card-header" id="mycardhandler">
					<center><h4>Available Chat Users</h4></center>
				</div>
				<div className="card-body" ref={bodyref} id="proprender">
					<center><div>{checkLoad}</div></center>
					<ul className="nav flex-column" id="chatul">{
						getUsers.data?(getUsers.data.map(user_data=>(
							<li key={user_data.account_id} ref={account_ref}>
									<div className="input-attach">
										{user_data.profile_picture!=""?(
											<Avatar 
												src={user_data.profile_picture}
												style={{backgroundColor:'purple'}}>
											</Avatar>
										):(
											<Avatar style={{backgroundColor:'purple'}}>{user_data.firstname.toString().charAt(0).toUpperCase()}</Avatar>
										)}
									</div>
								<a
									href="#chat" 
									onClick={()=>SetDetailsForRender(user_data)}
								className="nav-link">{user_data.firstname}</a>
							</li>
						))):<span></span>
					}
					</ul>
				</div>
			</div>
		)
	}
}
export {ChatCard};