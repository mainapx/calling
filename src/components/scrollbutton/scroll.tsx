import React,{useState,useRef} from 'react';
import ReactDOM from 'react-dom';
import Avatar from '@material-ui/core/Avatar';
import './scroll.css';

const ScrollButton=()=>{
	const iref=useRef();
	const [before,afterTest]=useState('fa fa-chevron-down');
	
	function ScrollBottom(){
		if(before=="fa fa-chevron-down"){
			ReactDOM.findDOMNode(iref.current).style.cssText="transform:scaleY(1);transition:0.3s transform;";
			document.body.style.scrollBehavior="smooth";
			window.scrollTo(0,document.body.scrollHeight);
			afterTest('fa fa-chevron-up');
		}else{
			window.scrollTo(0,0);
			ReactDOM.findDOMNode(iref.current).style.cssText="transform:scaleY(1);transition:0.3s transform;";
			afterTest('fa fa-chevron-down');
		}
	}
	return(
			<Avatar className="btn btn-default shadow-lg p-4" id="avatar" onClick={ScrollBottom} type="button">
				<i ref={iref} className={before}></i>
			</Avatar>
		);
}
export default ScrollButton;