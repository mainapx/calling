const HttpAccountService = (url,data,method) =>{
    switch(url){
        case 'register':
            url=`https://192.168.0.110:8888/user/api/register`
            break
        case 'login':
            url=`https://192.168.0.110:8888/user/api/login`
            break
        case 'users':
            url=`https://192.168.0.110:8888/users`
            break
        case 'send_otp':
            url=`https://192.168.0.110:8888/user/api/otp`
            break
        case 'verification':
            url=`https://192.168.0.110:8888/user/api/verification`
            break
        default:
            url=''
    }
    var register_data:any = null;
    if(method == "GET"){
        var header = {'Content-Type':'application/json'}
        register_data=({
            method:method,
            headers:Object.assign(header,data)
        })
    }else{
        register_data=({
            method:method,
            body:JSON.stringify(data),
            headers:{'Content-Type':'application/json'}
        })
    }
    async function Fetch(){
        const send_request = await fetch(url,register_data)
        return await send_request.json()
    }
    return Fetch().then(response=>{
        if(response.Status == "OK"){
            window.localStorage.setItem('authsetBtn',response.clientsetBtn);
			window.localStorage.setItem('userName',response.emailAccount);
            return true
        }
        return response
    })
}

const HttpImageService = (image) =>{
    const imagedata = new FormData()

    imagedata.append('change_profile',image.target.files[0])
    imagedata.append('authorization',window.localStorage.getItem("authToken"))
    imagedata.append("user_id",window.localStorage.getItem("user_id"))
    imagedata.append("account_id",window.localStorage.getItem("account_id"))
    
    const image_data = ({
        method:'POST',
        body:imagedata
    })

    const  ImageHandler =async () =>{
        const imageRespnose = await fetch(`https://192.168.0.110:8888/user/api/profile_change/`,image_data)
        return await imageRespnose.json()
    }
    return ImageHandler().then(response=>{
        
        if(response.Status == "OK"){
            const temp_show_profile = URL.createObjectURL(image.target.files[0])
            
            document.getElementById("profile-photo")?.setAttribute("src",temp_show_profile)
            window.localStorage.setItem("profile_picture",response.profile_url)
            return true

        }else{
            return false
        }
    })
}
export {HttpAccountService,HttpImageService};