import React,{useRef} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Recaptcha = () =>{
    const captcha = useRef()
    const RecaptchaValue = () =>{
        console.log(captcha.current?.value)
    }
    return(
        <ReCAPTCHA
            style={{marginTop:'10px'}}
            onChange={RecaptchaValue}
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            ref={captcha}
        />
    )
}
export default Recaptcha;