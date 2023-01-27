import React from 'react';
import './footer.css';
import { Link } from '@reach/router';
import SubscribeForm from '../subscribe/subscribe';
import AppStore from './appstore';

const Footer=()=>{
	return(	
			<React.Fragment>
					<div className="footer footer-bottom">
						<div className="flexer">
							<ul className="nav flex-column">
								<li className="nav-item"><Link to="#" >Sitemap</Link></li>
								<li className="nav-item"><Link to="#"  >Home</Link></li>
								<li className="nav-item"><Link to="#"  >Aboutus</Link></li>
								<li className="nav-item"><Link to="#" >Contactus</Link></li>
								<li className="nav-item"><Link to="#" >Login</Link></li>
								<li className="nav-item"><Link to="#" >Signup</Link></li>
								<li className="nav-item"><Link to= "#" >Feedback</Link></li>
							</ul>
							<ul className="nav flex-column">
								<li className="nav-item"><Link to="#" >Security Links</Link></li>
								<li className="nav-item"><Link to="#" >Encrypted Chat</Link></li>
								<li className="nav-item"><Link to="#" >VBN Connection</Link></li>
								<li className="nav-item"><Link to="#" >Analysis Tool</Link></li>
								<li className="nav-item"><Link to="#" >Portfolio</Link></li>
							</ul>
							<ul className="nav flex-column">
								<li className="nav-item"><Link to="#" >Help&Support</Link></li>
								<li className="nav-item"><Link to="#" >How to create Account</Link></li>
								<li className="nav-item"><Link to="#" >Delete Account Docs</Link></li>
								<li className="nav-item"><Link to="#" >Join Account</Link></li>
								<li className="nav-item"><Link to="#" >Contact & Support</Link></li>
								<li className="nav-item"><Link to="#" >Investment</Link></li>
							</ul>
							<div className="app-store">
								<SubscribeForm />
								<AppStore/>
							</div>
							<div className="service-assurance">
								<ul className="nav flex-column">
									<li className="nav-item">
										<i className='fa fa-check'></i>
										<span>99% Secure Assurace</span>
									</li>
									<li className="nav-item">
										<i className='fa fa-check'></i>
										<span>Free Trails </span>
									</li>
									<li className="nav-item">
										<i className='fa fa-check'></i>
										<span>Meeting Calls 100% secure</span>
									</li>
									<li className="nav-item">
										<i className='fa fa-check'></i>
										<span>We are use HMAC for Protecting</span>
									</li>
								</ul>
							</div>
						</div>
						<div className="copy-right">
							<small>{"CopyRight(2019-2023) All Right Reserved"}</small>
						</div>
						<div className="social-medias">
							<a href='#'><i className='fab fa-twitter'></i></a>
							<a href='#'><i className='fab fa-youtube'></i></a>
							<a href='#'><i className='fab fa-instagram'></i></a>
						</div>
						
					</div>
			</React.Fragment>
		);
}
export default Footer;