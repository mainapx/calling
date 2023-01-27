import React,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ConnectVideo from './webcam.js';
import AOS from 'aos';

const AcceptVideoCall=()=>{
	useEffect(()=>{
		AOS.init();
	})
	const [getState,setStateHandler]=useState({microColor:'green',isPhonePickUp:'fa fa-phone',reverseDisconnect:'',setScroll:'hidden',
		isMinimized:'block',isDisplay:'none',setHeight:window.innerHeight.toString()+"px"});

	return(
			<React.Fragment>
					<div className="card-test" data-aos="zoom-in-up" data-aos-duration="600" 

						style={{backgroundColor:'#2BC67D',position:'fixed',zIndex:'40000',
						height:this.state.setHeight,width:'100%',top:0,display:this.state.isMinimized}}  
						id="acceptInterface"
						>
						<div className="cardtest" style={{padding:0,position:'absolute',marginLeft:'auto',marginRight:'auto',right:0,left:0}}>
							<center>
								<Avatar style={{backgroundColor:'orange',height:'60px',width:'60px'}}>{}</Avatar>
							</center>
							<Button onClick={this.testFun}
								style={{position:'absolute',top:0,right:0,height:'60px',width:'60px',borderRadius:'50%',borderStyle:'none'}}>
								<i className="fa fa-window-minimize" style={{color:'white',fontSize:'25px'}}></i>
							</Button>
							<br />
							<center><h5 style={{color:'white',fontStyle:'fantasy'}}>{}</h5></center>
						</div>
						<div className="card-dd" style={{backgroundColor:'#96DADA'}}>							
							<ConnectVideo />
						</div>
						<div className="card-ft" style={{padding:0,position:'absolute',marginLeft:'auto',marginRight:'auto',right:0,left:0,bottom:0}}>
							<center>
								<ul className="nav" style={{display:'flex',justifyContent:'center'}}>
									<li className="nav-item">
										<Avatar style={{backgroundColor:getState.microColor,height:'60px',width:'60px'}}>
											<Button className="nav-link" style={{height:'60px',width:'60px'}} onClick={
													()=>getState.isPhonePickUp==='fa fa-phone'?setStateHandler({isPhonePickUp:'fa fa-microphone',microColor:'#39F2F5'}):this.setState({isEnabledMicrophone:'fa fa-microphone-slash',microColor:'#B9C4C4'})}>
												<i className={this.state.isEnabledMicrophone} style={{fontSize:'25px'}}></i>
											</Button>
										</Avatar>
									</li>&nbsp;&nbsp;&nbsp;&nbsp;
									<li className="nav-item">
										<Avatar style={{backgroundColor:'red',height:'60px',width:'60px'}}>
											<Button className="nav-link" onClick={()=>this.setState({setScroll:'scroll',transform:'rotate(-20deg)'})} style={{height:'60px',width:'60px'}}>
												<i className='fa fa-phone' style={{fontSize:'25px',color:'white',transform:this.state.reverseDisconnect}}></i>
											</Button>
										</Avatar>
									</li>
								</ul>
							</center>
						</div>
					</div>
				</React.Fragment>
		);
}
export default AcceptVideoCall;