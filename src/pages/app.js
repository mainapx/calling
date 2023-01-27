import React from 'react';
import {Router} from '@reach/router';
import AboutPage from './about';
import AdminHandler from './admin';
import ContactHandler from './contact';
import IndexPage from './index';
import Verification from './verification';
import {Private} from '../components/privateroute';

const MainRoute=()=>{
	return(
		<Router>
			<AboutPage path="/about" component={AboutPage} />
			<Private path="/admin" component={AdminHandler}/>
			<Verification path="/verification" component={Verification} />
			<ContactHandler path="/contact" component={ContactHandler} />
			<Private path="/" component={IndexPage} />
		</Router>
	);
}
export default MainRoute;
