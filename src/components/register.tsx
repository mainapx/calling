import React,{useState} from 'react';
import {navigate} from 'gatsby'
import ReactDOM from 'react-dom';
import {HttpAccountService} from '../service/http.service';
import './register.css';
import {LinearProgress, TextField} from '@material-ui/core';
import AOS from 'aos';
import RegisterPopup from './popup/register';
import Country from './country_selector/country_drop';
import validator from 'validator'
import Select from 'react-select'
import Recaptcha from './recaptcha/recaptch';
import RLButton from './login_register_button/button';
import Error from './popup/login_error';
import { useEffect } from 'react';
import { FormGroup, InputAdornment } from '@material-ui/core';

const OptionValues=[{
	'value':'Male','label':'Male','Name':'Male','type':'Gender'},{
	'value':'Female','label':'Female','Name':'Female','type':'Gender'},{
	'value':'Other','label':'Other','Name':'Other','type':'Gender'
}]

function RegisterModal(dispatch){
	const [getInput,setInput]=useState({Firstname:'',Lastname:'',Emailid:'',Phone:'',Password:'',Gender:'Select Sex'});
	const [getInvalidIcon,setInvalidIcon] = useState('')
	const [getPhoneState,setPhoneState]= useState('')
	const [getLoader,setLoader] = useState(false)
	const [getISOCode,setISOCode] = useState('');
	const [getBtn,setBtn]=useState({isbtndisabled:true,btnState:'Create Account',emailStatus:'',phoneStatus:'',passwordStatus:'',registerInfoDisable:false});
	AOS.init();
	
	function GetInputs(e){
		console.log(getISOCode)
		if(e.type == "Gender"){
			setInput(prev=>({...prev,Gender:e.value}))
		}
		else{
			setInput(prev=>({...prev,[e.target.name]:e.target.value}))

			if(e.target.name == "Emailid" && !validator.isEmail(e.target.value)){
				setBtn(prev=>({...prev,emailStatus:'Invalid Email Address',isbtndisabled:true}))
				setInvalidIcon('')
			}else{
				setBtn(prev=>({...prev,emailStatus:''}))
			}
			if(e.target.name == "Password" && !validator.isStrongPassword(e.target.value)){
				setBtn(prev=>({...prev,passwordStatus:'Password is weak',isbtndisabled:true}))

			}else{
				setBtn(prev=>({...prev,passwordStatus:''}))
			}
			if(e.target.name == "Phone" && !validator.isMobilePhone(e.target.value,getISOCode)){
				setBtn(prev=>({...prev,phoneStatus:'Invalid Phone Number',isbtndisabled:true}))
			}else{
				setBtn(prev=>({...prev,phoneStatus:''}))
			}

		}
	}

	useEffect(()=>{
		if(validator.isEmail(getInput.Emailid)){
			setInvalidIcon('fa fa-check')
		}
		if(validator.isEmail(getInput.Emailid) && validator.isMobilePhone(getInput.Phone) && validator.isStrongPassword(getInput.Password) && (getInput.Firstname && getPhoneState && getInput.Lastname!="") &&['Male','Female','Other'].includes(getInput.Gender)){
			setBtn(pres=>({...pres,isbtndisabled:false}))
		}	
	},[getInput.Emailid,getInput.Phone,getInput.Password,getInput.Gender,getInput.Firstname,getInput.Lastname])

	function RegisterUser(){
		setBtn(preve=>({...preve,registerInfoDisable:true,isbtndisabled:true}))	
		setLoader(true)
		setTimeout(()=>{
			HttpAccountService("register",getInput,'POST').then(response=>{
				if(response.status == "OK"){
					localStorage.setItem("email",response.emailAccount)
					document.querySelector(".modal-backdrop")?.remove()
					navigate("/verification");
				}else{
					setLoader(false)
					ReactDOM.render(<RegisterPopup message={response.message} userClass={'alert alert-danger'} bgcolor="red" textcolor="white"/>,document.getElementById("user_error"))
					setBtn(preve=>({...preve,registerInfoDisable:false,isbtndisabled:false}))	

				}
			})
		},4000)
	}	

	return(
			<React.Fragment>
				{getLoader == true ? <LinearProgress  style={{backgroundColor:'white',color:'white',height:'10px'}}  /> : false}
				<div className="modal fade" data-backdrop="static" data-keyboard="false" id="mymodal" role="dialog"
                aria-labelledby="mymodals"
                 aria-hidden="true">
					<div id="user_error"></div>


                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4>Signin</h4>
                            <a href="#" className="close" data-dismiss="modal"
                                aria-label="close"><i className="fa fa-close"></i>
                            </a>

                        </div>
                        <div className="container">

                            <div id="errorhandler"></div>

	                        <div className="form-group">
	                            <TextField 
	                                style={{width:'100%'}}
	                                label={"Firstname"}
	                                value={getInput.Firstname}
									disabled={getBtn.registerInfoDisable}
	                                name="Firstname"
	                                onChange={GetInputs}
	                                />
	                            
	                            <TextField
	                                label={"Lastname"}
	                                value={getInput.Lastname}
	                                style={{width:'100%'}}
	                                name="Lastname"
									disabled={getBtn.registerInfoDisable}
	                                onChange={GetInputs}
	                             />
	                              <TextField 	                              	
	                              	onChange={GetInputs} 
	                                label={"Emailid"}
	                                name="Emailid"
	                                value={getInput.Emailid}
									disabled={getBtn.registerInfoDisable}
	                                style={{width:'100%'}}
									InputProps={{
										endAdornment:(
											<InputAdornment position="end">
												<i className={getInvalidIcon}></i>
											</InputAdornment>
										)										
									}}

	                             />
	                             <span id="emailError">{getBtn.emailStatus}</span>
								 <div className='country_phone'>
									<Country disabled={getBtn.registerInfoDisable} setISOCode={getISOCode} setPhoneState={setPhoneState} />

									<FormGroup style={{width:'100%',display:'flex',alignItems:'center',flexDirection:'row',paddingLeft:'10px',justifyContent:'space-evenly'}} >
										<span style={{fontWeight:'bold'}} >{getPhoneState}</span>
										<TextField	        
											onChange={GetInputs}
											inputProps={{maxLength:12}}
											label={"Phone"}
											value={getInput.Phone}
											disabled={getBtn.registerInfoDisable}
											name="Phone"
										/>
									</FormGroup>
								 </div>
	                             <span id="phonerror">{getBtn.phoneStatus}</span>
									<TextField 
										type="password"
										onChange={GetInputs}
										label={"Password"}
										disabled={getBtn.registerInfoDisable}
										value={getInput.Password?getInput.Password:''}
										name="Password"
										style={{width:'100%'}}									
									/>
	                             <span id="passworderror">{getBtn.passwordStatus}</span>
	                             <Select
								  	isDisabled={getBtn.registerInfoDisable}
									options={OptionValues} 
								 	defaultValue={{'value':'Select Sex',label:'Select Sex','Name':'Select Sex','type':'Select Sex'}}
	                             	name="Gender"
									 value={{label:getInput.Gender}}
	                             	onChange={GetInputs}
	                             />

								 <RLButton 
								 	background={''} 
									size={100} 
									outline={'none'} 
									color={''} 
									id={'register_btn'}
									marginTop={'16px'}
									onClick={RegisterUser} 
									variant={'outlined'} 
									text={getBtn.btnState} 
									disabledbtn={getBtn.isbtndisabled}
									name={"btnState"} 
								/>
	                            
	                        </div>
	                    </div>
                    </div>
                </div>
            </div>
			</React.Fragment>

		);
}
export default RegisterModal;
