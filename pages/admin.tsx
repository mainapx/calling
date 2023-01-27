import React,{useEffect,useState} from 'react';
import Header from '../components/header/header';
import {Link} from 'gatsby';
import ScriptLoader from '../components/scriptLoader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {ChatCard} from '../components/chatcard/chatcard';
import Footer from  '../components/footer/footer';
import '../components/layout.css';
import dummy from '../../static/dummy/dummy.webp';
import VideoCall from '../components/videocall/video';
import SendCall from '../components/audiocall/sendcall';
import Radium,{StyleRoot} from 'radium';
import {bounce} from 'react-animations';
import ConnectVideo from '../components/videocall/webcam';
import ReceiveCallSound from '../../static/sound/receive.mp3';
import RenderProfileButton from '../components/header_toggle_profile/dropdown_admin';
import ReactDOM from 'react-dom';
import MinimizeBar from '../components/videocall/minimize';
import AudioSendSound from '../../static/sound/dialing.wav';
import useSound from 'use-sound';

function SendingAudioCall(props){
	const [getPhoneState,setPhoneState]=useState('fa fa-phone');
	const [sendAudioSound]=useSound(AudioSendSound);
	useEffect(()=>{
		document.body.style.overflow="hidden";
		document.getElementById("show_calling")?.classList.add("audio-call")
	},[])
	return(
			<SendCall forCalling={
						<li className="nav-item">
							<Avatar style={{backgroundColor:"red",height:'60px',width:'60px'}}>
								<Button className="nav-link" style={{height:'60px',width:'60px',backgroundColor:'red',transform:'rotate(-135deg)'}}>
									<i className={getPhoneState} style={{fontSize:'25px'}}></i>
								</Button>
							</Avatar>
						</li>
				} Name={window.localStorage.getItem('Name')}
				SoundHandler={sendAudioSound()}
				Status={'Calling...'}
				profile={props.profile}
				title={props.title}

			/>
		);
}

const SendVideoCall=()=>{
	return(
				<VideoCall 
					firstBtn={
						
						<li className="nav-item">
							<Avatar style={{height:'60px',width:'60px'}}>
								<Button className="nav-link" style={{height:'60px',width:'60px'}} onClick={
										()=>this.state.isEnabledMicrophone==='fa fa-microphone-slash'?this.setState({isEnabledMicrophone:'fa fa-microphone',microColor:'#39F2F5'})||<ConnectVideo />:this.setState({isEnabledMicrophone:'fa fa-microphone-slash',microColor:'#B9C4C4'})}>
									<i className={this.state.isEnabledMicrophone} style={{fontSize:'25px'}}></i>
								</Button>
							</Avatar>
						</li>
						
					}
					secondBtn={
							<li className="nav-item">
								<Avatar style={{backgroundColor:'red',height:'60px',width:'60px'}}>
									<Button className="nav-link" onClick={()=>this.setState({setScroll:'scroll'})} style={{height:'60px',width:'60px'}}>
										<i className='fa fa-phone' style={{fontSize:'25px',color:'white',transform:this.state.reverseDisconnect}}></i>
									</Button>
								</Avatar>
							</li>
						}
					isVideoConnected={<ConnectVideo />}
				/>
		);
}

function ReceiveVideoCall(){
	useEffect(()=>{
		//document.querySelector('.model-open').style.overflowY="scroll";
	},[])
	const bouncer={
		bounce:{
			animation:'3s infinite',
			animationName:Radium.keyframes(bounce,'bounce')
		}
	}
	return(
			<VideoCall firstBtn={
				<StyleRoot>
					<li className="nav-item"  style={bouncer.bounce}>	
						<Avatar style={{backgroundColor:'green',height:'60px',width:'60px',transition:'0.32s all ease-in-out'}}>
							<Button className="nav-link" style={{height:'60px',width:'60px',backgroundColor:'green'}}>
								<i className={"fa fa-phone"} style={{fontSize:'25px',color:'white',fontWeight:'bold'}}></i>
							</Button>
						</Avatar>
					</li>
				</StyleRoot>
			}
			secondBtn={
				<li className="nav-item">
						<Avatar style={{backgroundColor:'red',height:'60px',width:'60px'}}>
							<Button className="nav-link" style={{height:'60px',width:'60px',backgroundColor:'red',transform:'rotate(-135deg)'}}>
								<i className={"fa fa-phone"} style={{fontSize:'25px',color:'white',fontWeight:'bold'}}></i>
							</Button>
						</Avatar>
				</li>
			}
		/>
	);
}


const AdminHandler=(props)=>{

		const myStyles={border:0,backgroundColor:'#656572',borderRadius:'50%',width:'50px',marginBottom:'10px'};
		const myStylesList={border:0,backgroundColor:'#656572',borderRadius:'50%',width:'50px',marginBottom:'10px',padding:0};
		const btnStyle={backgroundColor:'orange',color:'white',fontWeight:'bold'};
		const [getComponent,setComponent] = useState(false)
		const [isOnlineOrOffline,setOnlineOrOffline] = useState("On")
		const [getState,setState] = useState(props.location.state)
		const [updated,setupdated] = useState(false)
		const [getprofileimage,setprofileImage] = useState('')
		const [callingvisible,setcallingvisible] = useState(false)
		const [getAudioVideoEnableButton,setAudioVideoEnableButton] = useState(true)
		const [getImage,setImage] =useState(window.localStorage.getItem("profile_picture"))
		useEffect(()=>{			
			if(updated == true){
				setComponent(true)
				setupdated(false)
				setState(props.location.state?.data)
			}
			if(getAudioVideoEnableButton == false){
				setAudioVideoEnableButton(true)
			}
			
		},[updated])
		return(
				<React.Fragment>
					<>

		          <ScriptLoader />

	         	 	<Header
				 	 	contact={
							getState !=null?(
								<RenderProfileButton 
									getState={getState} 
									profile={getState.dataprofile_picture}
									myStylesList={myStylesList}
								/>
							):<RenderProfileButton 
								getState={getState} 
								profile={getImage}
								myStylesList={myStylesList} 
							/>
						}
						
						loginmodel={<li data-toggle="tooltip" data-placement="top" title="Videocall" className="nav-item header-buttons set-disabled" style={btnStyle}><a className={getAudioVideoEnableButton == false ?'nav-link header-buttons btn':'nav-link header-buttons btn disabled'}   onClick={()=>ReactDOM.render(<SendVideoCall />,document.getElementById('show_calling'))}><i className='fa fa-video-camera'></i></a></li>}
						about={<li data-toggle="tooltip" data-placement="top" title="VideoCall" className="nav-item header-buttons" style={myStyles}><a  className={getAudioVideoEnableButton == false ?'nav-link header-buttons btn':'nav-link header-buttons btn disabled'}  onClick={()=>ReactDOM.render(<VideoCall />,document.getElementById('show_calling'))}><i className='fa fa-video-camera'></i></a></li>}
						home={<li data-toggle="tooltip" data-placement="top" title="AudioCall"  className='nav-item header-buttons' style={myStyles} ><a className={getAudioVideoEnableButton == false ?'nav-link header-buttons btn':'nav-link header-buttons btn disabled'} onClick={()=>setcallingvisible(true)||ReactDOM.render(<SendingAudioCall profile={getprofileimage} title={getState?.dataprofile_picture} />,document.getElementById('show_calling'))} ><i className='fa fa-phone'></i></a></li>}
						register={<li className="nav-item header-buttons" style={{border:0,backgroundColor:'transparent',width:'auto'}}><Link to="/logout" className="nav-link pb-0"  style={{color:'white'}}>Logout</Link></li>}
							
						/>
	
					<div id="show_calling"></div>
					{getComponent == false ? (
						<ChatCard 
							switchToUsers={setupdated}
							users={false} 
							callingvisible={false}
							user_profile={setprofileImage}
							setOnlineOrOffline={setOnlineOrOffline} 
							audiovideobutton={setAudioVideoEnableButton} 
						/>
					):(
						<>
							<ChatCard 
								users={true} 
								switchToUsers={setupdated} 
								callingvisible={false}
								user_profile={setprofileImage}
								setOnlineOrOffline={setOnlineOrOffline} 
								audiovideobutton={setAudioVideoEnableButton} 
							/>
							<Footer />
						</>
					)}
	    		  
	    		  <MinimizeBar />
				  {getComponent == false ? <Footer /> : false}
				  
	    		  </>
	    		  </React.Fragment>
			);
}

export default AdminHandler;
