import * as React from "react"
import {useRef,useState} from 'react';
import './header.css';
import { Link } from "@reach/router";
import LoginModal from '../login/login.js';
import ReactDOM from 'react-dom';
import RegisterModal from '../register.js';


const Header = (props) => {
  const checkmobile=useRef();
  const [iconState,oldState]=useState({iconStates:'fa fa-bars',displayState:'none'});

  const ResponsiveStyle={color:'white',fontWeight:'bold'};
  function CheckState(){
    if(iconState.iconStates=='fa fa-bars'||iconState.displayState=="none"){
      oldState({iconStates:'fa fa-close',displayState:'block'});}
      else{
        oldState({iconStates:'fa fa-bars',displayState:'none'});
      }
  }

  return(
      <div className="header-bar">
        <nav className="navbar navbar-fixed-top z-depth-3 p-2 header-bar">
            <a type="button"  className="navbar-brand header-logo ml-3 mr-0">{"GoMeet"}</a>
            <ul className="nav nav-pills header-menu-items">
                {props.home}
                {props.login}
                {props.register}
                {props.about}
                {props.contact}
                          
             <a type="button" className="btn btn-default responsive-bars-button"
                onClick={CheckState}
             ><i className={iconState.iconStates}
              style={{color:'white',fontSize:'30px',transition:'class 2s'}}


             ></i></a>

            </ul>
             
        </nav>
        {/*
                  <ul className="nav flex-column" ref={checkmobile} id="mobileul" style={{display:iconState.displayState}} >
                    <li className="nav-item"><Link to="/" className="nav-link" style={ResponsiveStyle}>Home</Link></li>
                    <li className="nav-item"><Link to="/about" className="nav-link" style={ResponsiveStyle} >About</Link></li>
                      {props.loginmodel}
                      {props.registermodel}                    
                    <li className="nav-item"><Link  style={ResponsiveStyle} to="/contact" className="nav-link">Contact</Link></li>
                  </ul>
  */}
      </div> 
    );
}
export default Header
