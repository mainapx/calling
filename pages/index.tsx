import React from "react"
import Header from '../components/header/header';
import ScriptLoader from '../components/scriptLoader';
import Carousel from '../components/carousel/carousel';
import ReactDOM from 'react-dom';
import {isAuthenticated} from '../authentication/authentication';
import {Link,navigate} from '@reach/router';
import LoginModal from '../components/login/login';
import '../components/layout.css';
import RegisterModal from '../components/register';
import Footer from  '../components/footer/footer';

const IndexPage=(props)=>{
    const ResponsiveStyle={color:'white',fontWeight:'bold'};

  return(
        <>
          <div id="show_popup"></div>
          <ScriptLoader />

          {isAuthenticated()==true?navigate("/admin"):(
            <>
	          <Header
	          	home={<li className="nav-item active-page"><Link to="/">{"Home"}</Link></li>}
              login={<li className="nav-item"><a type="button" data-toggle="modal" data-target="#mymodal"

                 	onClick={()=>ReactDOM.render(<LoginModal />,document.getElementById('show_popup'))} >{"Login"}</a></li>}
					register={<li className="nav-item"><a type="button" data-toggle="modal" data-target="#mymodal"
                 	onClick={()=>ReactDOM.render(<RegisterModal />,document.getElementById('show_popup'))} >{"Signup"}</a></li>}       
					about={<li className="nav-item"><Link to="/about" >{"Aboutus"}</Link></li>} 
					contact={<li className="nav-item"><Link to="/contact" >{"Contactus"}</Link></li>} 
					team={<li className="nav-item"><Link to="/team" >{"Our Team"}</Link></li>}
          loginmodel={<li className="nav-item"><Link to="#" data-target="#mymodal" style={ResponsiveStyle} onClick={()=>ReactDOM.render(<LoginModal />,
                        document.getElementById("show_popup")

                      )} data-toggle="modal" >Login</Link></li>}

          registermodel={<li className="nav-item"><Link style={ResponsiveStyle} onClick={()=>ReactDOM.render(<RegisterModal />,document.getElementById("show_popup"))} data-target="#mymodal" to="#mymodal" data-toggle="modal" >Signup</Link></li>}

          />
          <Carousel />
    		  <Footer />
          </>
          )}
        </>
    );

}
export default IndexPage;
