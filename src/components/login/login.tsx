import React,{useState} from 'react';
import {navigate} from 'gatsby';
import AOS from 'aos';
import { Button,LinearProgress,InputAdornment } from '@material-ui/core';
import Error from '../popup/login_error';
import ReactDOM from 'react-dom';
import {HttpAccountService} from '../../service/http.service';
import validator from 'validator'
import './login.css';
import {TextField} from '@material-ui/core';
import Recaptcha from '../recaptcha/recaptch';

export default function LoginModal(){
	AOS.init();
	const [passwordState,setPasswordState] = useState('');
	const [getemailState,setemailStatus] = useState('');
	const [getLoader,setLoader] = useState(false)
	const [getType,setType] = useState({fieldType:'password',iconType:'fa fa-eye-slash'})
	const [beforeLogin,afterLogin]=useState({islogindisabled:true,loginValue:'Login',username:'',password:'',usernameState:false,passwordState:false});

	function LoginHandler(){
		afterLogin(prev=>({...prev,usernameState:true,passwordState:true,islogindisabled:true}))
		setLoader(true)
		
		HttpAccountService('login',{Username:beforeLogin.username,Password:beforeLogin.password},'POST').then(response=>{
			setTimeout(()=>{
				if(response.status=="Failed"){
					const error_store = ReactDOM.createRoot(document.getElementById("ErrorLogin"))
					error_store.render(<Error message={response.message} />)
					afterLogin(prev=>({...prev,usernameState:false,passwordState:false,islogindisabled:false}))
					setLoader(false)
					setTimeout(()=>{
						error_store.render("")
					},3000)
				}else{
					document.querySelector(".modal-backdrop")?.remove()
					window.localStorage.setItem('authToken',response.token);
					window.localStorage.setItem('user_id',response.data[0].user_id)
					window.localStorage.setItem('email',response.data[0].email);
					window.localStorage.setItem("profile_picture",response.data[0].profile_picture)
					window.localStorage.setItem("account_id",response.data[0].account_id)
					window.localStorage.setItem('user_Account_Name',response.data[0].firstname)
					navigate("/admin",{state:{replace:false,data:{authToken:response.token,user_id:response.data[0].user_id,email:response.data[0].email,profile_picture:response.data[0].profile_picture,account_id:response.data[0].account_id,user_Account_Name:response.data[0].firstname}}})
				} 
			},2000)
		})
	}

	function Changer(e){
		afterLogin(prev=>({...prev,[e.target.name]:e.target.value}))
		
		if(validator.isEmail(beforeLogin.username) && validator.isStrongPassword(beforeLogin.password)){
			afterLogin(prev=>({...prev,islogindisabled:false}))
			setemailStatus("")
			setPasswordState('')
		}
		if(!validator.isEmail(beforeLogin.username)){
			setemailStatus("Invalid Email Address")
			afterLogin(prev=>({...prev,islogindisabled:true}))
		}else{
			setemailStatus("")
			afterLogin(prev=>({...prev,islogindisabled:false}))			
		}
		if(!validator.isStrongPassword(beforeLogin.password)){
			setPasswordState('Password Should be Strongest')
			afterLogin(prev=>({...prev,islogindisabled:true}))
		}
	}

	return(
			<React.Fragment>
				{getLoader ? <LinearProgress  style={{backgroundColor:'white',color:'white',height:'10px'}}  /> : false}

				<div className="modal fade" id="mymodal" role="dialog"
                aria-labelledby="mymodals"
                 aria-hidden="true"
				 data-backdrop="static" data-keyboard="false"
				 >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    	<div id="ErrorLogin"></div>
                        <div className="modal-header">
                            <h4 id="text-center">Signin</h4>
                            <a href="#" className="close" data-dismiss="modal"
                                aria-label="close"><i className="fa fa-close"></i>
                            </a>
                        </div>
                        <div className="container">
	                        <div className="form-group mb-0">
	                            <TextField placeholder={"Enter the Username"} 
	                                label={"Username"}
	                                className="userId"
									name="username"
									value={beforeLogin.username}
	                                disabled={beforeLogin.usernameState}
	                                onChange={Changer}
	                                />
	                            <span className="invalid-input">{getemailState}</span>

	                            <TextField 
									placeholder={"Enter the Password"}
									label="Password"
									type={getType.fieldType}
									value={beforeLogin.password}
	                                className="passId"
									name="password"
	                                disabled={beforeLogin.passwordState}
	                              	onChange={Changer}
									InputProps={{
										endAdornment:(
											<InputAdornment position="end">
												<a href="#">
												<i className={getType.iconType} 
													onClick={()=>
															getType.iconType == "fa fa-eye" ? setType(prev=>({...prev,iconType:"fa fa-eye-slash",fieldType:'password'})) : setType({iconType:"fa fa-eye",fieldType:'text'})}></i>
												</a>
											</InputAdornment>
										)										
									}}
	                             />
	                             <span className="invalid-input">{passwordState}</span>
								 <Recaptcha
								/>
	                            <Button
									style={{width:'100%',border:'1px solid',backgroundColor:'#e6dfcd'}}
									 onClick={LoginHandler} 
									 className="mt-2"
									disabled={beforeLogin.islogindisabled}
									size="large"
									>{beforeLogin.loginValue}</Button>
	                        </div>
							
	                    </div>						
                    </div>
                </div>
            </div>
		</React.Fragment>
	);
}
