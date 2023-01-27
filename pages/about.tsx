import React from 'react';
import Header from '../components/header/header';
import {Link} from 'gatsby';
import ScriptLoader from '../components/scriptLoader';
import ReactDOM from 'react-dom';
import ScrollButton from '../components/scrollbutton/scroll';
import LoginModal from '../components/login/login';
import RegisterModal from '../components/register';
import Footer from  '../components/footer/footer';

const AboutPage:React.FC=()=>{
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
					about={<li className="nav-item active-page"><Link to="/about" >{"Aboutus"}</Link></li>} 
					contact={<li className="nav-item"><Link to="/contact" >{"Contactus"}</Link></li>} 
					team={<li className="nav-item"><Link to="/team" >{"Our Team"}</Link></li>}
					loginmodel={<li className="nav-item"><Link to="#" data-target="#mymodal" onClick={()=>ReactDOM.render(<LoginModal />,
							document.getElementById("show_popup")

						)} data-toggle="modal" >Login</Link></li>}

					registermodel={<li className="nav-item"><Link onClick={()=>ReactDOM.render(<RegisterModal />,document.getElementById("show_popup"))} data-target="#mymodal" to="#mymodal" data-toggle="modal" >Signup</Link></li>}

				/>
				<div className="row mx-0">
					<div className="col-lg-12 px-0">
						<div className="text-center jumbotron mb-0">
							<h3>About us</h3>
							<span>An About Us page helps your company make a good f
							irst impression, and is critical for building customer trust and loyalty. An About Us page should
							 make sure to cover basic information about the store and its founders, explain the company's purpose
							  and how it differs from the competition, and encourage discussion and interaction. Here are some 
							  free templates, samples, and example About Us pages to help your ecommerce store stand out from the crowd.
							When it comes to personalizing your online store, nothing is more effective than an About Us page.
							This is a quick summary of your company's history and purpose, and should provide a clear overview .
							of the company's brand story. A great About Us page can help tell your brand story, establish customer 
.							loyalty, and turn your bland ecommerce store into an well-loved brand icon. Most importantly, 
							it will give your customers a reason to shop from your brand. </span>                                                             
						</div>
					</div>
				</div>
				<ScrollButton />
				<Footer />
			</React.Fragment>

		);
}
export default AboutPage;