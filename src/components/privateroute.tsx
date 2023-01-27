import React from 'react';
import {GetAuthentication,isAuthenticated,isLoggedIn} from '../authentication/authentication';

const Private=({component:Component})=>{
	if(GetAuthentication()==true){
		return <Component />
	}
	return null;
}

const isSessionActiveOnIndexPage=({component:AuthComponent})=>{
	if(isAuthenticated()==true){
		return <AuthComponent />
	}
	return null;
}
const Logout=({component:LoginComponent})=>{
	if(isLoggedIn()==true){
		return <LoginComponent />
	}
	return null; 
}

export {Private,isSessionActiveOnIndexPage,Logout};