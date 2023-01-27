import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'gatsby';
import Header from '../components/header/header';
import '../components/layout.css';
import LoginModal from '../components/login/login';
import RegisterModal from '../components/register';
import ScriptLoader from '../components/scriptLoader';
import Footer from  '../components/footer/footer';


const ContactHandler=()=>{
	const iconStyle={fontSize:'30px',color:'black'}
	return(
			<React.Fragment>
				<div id="show_popup"></div>
				<ScriptLoader />
				<Header
					home={<li className="nav-item"><Link to="/">{"Home"}</Link></li>}
					login={<li className="nav-item"><a type="button" data-toggle="modal" data-target="#mymodal"
					onClick={()=>ReactDOM.render(<LoginModal />,document.getElementById('show_popup'))} >{"Login"}</a></li>}
					register={<li className="nav-item"><a type="button" data-toggle="modal" data-target="#mymodal"
					onClick={()=>ReactDOM.render(<RegisterModal />,document.getElementById('show_popup'))} >{"Signup"}</a></li>}       
					about={<li className="nav-item"><Link to="/about" >{"Aboutus"}</Link></li>} 
					contact={<li className="nav-item active-page"><Link to="/contact" >{"Contactus"}</Link></li>} 
					team={<li className="nav-item"><Link to="/team" >{"Our Team"}</Link></li>}
					loginmodel={<li className="nav-item"><Link to="#" data-target="#mymodal" onClick={()=>ReactDOM.render(<LoginModal />,
							document.getElementById("show_popup")

						)} data-toggle="modal" >Login</Link></li>}

					registermodel={<li className="nav-item"><Link onClick={()=>ReactDOM.render(<RegisterModal />,document.getElementById("show_popup"))} data-target="#mymodal" to="#mymodal" data-toggle="modal" >Signup</Link></li>}

				/>

				<div className="">
					<div className="col-lg-12 px-0">
						<div className="jumbotron text-center mb-0">
							<h4 style={{borderBottom:'1px solid'}}><b>{"Contact US"}</b></h4>
							<div className="flexering text-align-left  d-flex justify-content-center">
								<ul className="nav flex-column">
									<li className="nav-item"><h5 className="nav-link"><b>A.B Block Mumbai Maharastra</b></h5></li>
									<li className="nav-item"><h5 className="nav-link"><b>+91 84787867,+915678678758</b></h5></li>
									<li className="nav-item"><h5 className="nav-link"><b>chatapplication@mail.com</b></h5></li>
								</ul>
								<ul className="nav flex-column">
									<li className="nav-item"><i  style={iconStyle} className="nav-link fa fa-home"></i></li>
									<li className="nav-item"><i style={iconStyle} className="nav-link fa fa-phone"></i></li>
									<li className="nav-item"><i style={iconStyle} className="nav-link fa fa-envelope"></i></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</React.Fragment>

		);
}
export default ContactHandler;