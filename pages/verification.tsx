import React,{useEffect,useRef,useState} from 'react';
import ReactDOM from 'react-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import {navigate} from 'gatsby';
import { HttpAccountService } from '../service/http.service';
import ScriptLoader from '../components/scriptLoader';
import BackButton from '../components/backbutton/back';

const Verification=()=>{
	const [circularState,enabledCircular]=useState(false);
	const [isLoading,setLoading] = useState(true)
	const [loadingRef,setLoadingRef] = useState(<CircularProgress style={{color:'black'}} />);
	const otpState=useRef({first:'',second:'',third:'',fourth:'',fifth:'',sixth:''});
	function MainOTP(){

		ReactDOM.render(<CircularProgress />,document.querySelector(".progresser"))
		Object.values(otpState.current).map(x=>{
			x.setAttribute("disabled","")

		})


		HttpAccountService("verification",({
			'authorization':localStorage.getItem('authToken'),
			'emailid':localStorage.getItem('email'),
			'otp':otpState.current['first'].value+otpState.current['second'].value+otpState.current['third'].value+otpState.current['fourth'].value+otpState.current['fifth'].value+otpState.current['sixth'].value
			}),'PUT'
		).then((response)=>{
			setTimeout(()=>{response.status==="OK"?enabledCircular(true)||navigate("/admin",{state:{response}}):ReactDOM.render(<div className="alert alert-danger"><center>{response.message}</center></div>,document.getElementById("ErrorVerification"))||enabledCircular(true)},2000)
			setTimeout(()=>{ReactDOM.render("",document.getElementById("ErrorVerification"))},4000);
		})
	}

	function SendOTPS(){
			otpState.current['first'].value!==''&&otpState.current['second'].value!==''&&otpState.current['third'].value!==''&&otpState.current['fourth'].value!==''&&otpState.current['fifth'].value!==''&&otpState.current['sixth'].value!==''?MainOTP():console.log("Invalid Input");
	}

	const inputStyle={width:'50px'};
	useEffect(()=>{
		HttpAccountService("send_otp",{'authentication':localStorage.getItem('authToken'),
		'email':localStorage.getItem('email')},'POST').then(response=>{
			if(response.status==="OK"){
				setLoading(false)				
			
			}else if(response.message== "Unauthorized"){
				navigate("/")	
			}else{
				setLoading(true)
				setLoadingRef(<BackButton />)
			}
		})
	},[isLoading]);

	return(
		<>
		{isLoading == true?(
			<div  style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
				<div>{loadingRef}</div>
			</div>
		):(
			<>
			<ScriptLoader />
			<div id="ErrorVerification"></div>
			<div className="row">
				<div className="col-lg-4"></div>
					<div className="col-lg-4">
						<div className="card">
							<div className="card-header" style={{backgroundColor:'#6E6EEC'}}>
								<h3 style={{fontWeight:'bold',fontStyle:'fantasy',color:'white'}}><center>Verification Code </center></h3>
							</div>
								<div className="card-body">
								<div className="form-inline d-flex justify-content-between">
									<input type="text" onChange={SendOTPS} ref={(e)=>otpState.current['first']=e} style={inputStyle} className="form-control" />
									<input type="text" onChange={SendOTPS} ref={(e)=>otpState.current['second']=e}  style={inputStyle} className="form-control" />
									<input type="text" onChange={SendOTPS} ref={(e)=>otpState.current['third']=e}  style={inputStyle} className="form-control" />
									<input type="text" onChange={SendOTPS} ref={(e)=>otpState.current['fourth']=e}  style={inputStyle}  className="form-control" />
									<input type="text" onChange={SendOTPS} ref={(e)=>otpState.current['fifth']=e} style={inputStyle} className="form-control" />
									<input type="text" onChange={SendOTPS} ref={(e)=>otpState.current['sixth']=e}  style={inputStyle}  className="form-control" />
								</div>
							</div>
							<center><span className="progresser"></span></center>
						</div>
					</div>
				</div>
			</>
		)
	  }
	</>
  )
}

export default Verification;