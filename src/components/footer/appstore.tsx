import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const AppStore = () =>{
    return(
        <div className="app-store-container d-flex flex-column">
            <div className="app-play-store">
                <i className='fab fa-google-play'></i>
                <span>  
                   <span>Get IT ON</span>
                    <h4>Google Play</h4>
                </span>
            </div>
            <div className="app-play-store">
                <i className='fab fa-apple'></i>
                <span>  
                   <span>Download on the </span>
                    <h4>App Store</h4>
                </span>
            </div>
        </div>

    )
}
export default AppStore;