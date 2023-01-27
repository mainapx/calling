import React,{useState,useEffect} from 'react';
import SendCall from './sendcall.js';
import Radium,{StyleRoot} from 'radium';
import {bounce} from 'react-animations';
import * as ReceiveCallSound from '../../static/sound/receive.mp3';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const bouncer={
	bounce:{
		animation:'3s infinite',
		animationName:Radium.keyframes(bounce,'bounce')
	}
}

const ReceiveCall=()=>{
	/*
	return(
			<React.Fragment>
				<SendCall forCalling={
					
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
				forReceiving={
						<li className="nav-item">
								<Avatar style={{backgroundColor:'red',height:'60px',width:'60px'}}>
									<Button className="nav-link" style={{height:'60px',width:'60px',backgroundColor:'red',transform:'rotate(-135deg)'}}>
										<i className={"fa fa-phone"} style={{fontSize:'25px',color:'white',fontWeight:'bold'}}></i>
									</Button>
								</Avatar>
						</li>
				} Name={window.localStorage.getItem('Name')}
				  SoundHandler={ReceiveCallSound}
				  Status={'Receiving...'}
				/>
			</React.Fragment>
		);
		*/
		return null
}
export default ReceiveCall;