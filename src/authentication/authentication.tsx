export const isBrowser=()=> typeof window !=="undefined"

const GetAuthentication=()=>{
	 if(isBrowser()&&window.localStorage.getItem('authToken')||isBrowser()&&window.localStorage.getItem('userName')){
	 	return true
	 }
	 return false
}
const isAuthenticated=()=>{
	const sendData=({
		method:'PUT',
		headers:{'Content-Type':'application/json'},
		body:JSON.stringify({
			'authorization':isBrowser()&&window.localStorage.getItem("authToken"),'username':isBrowser()&&window.localStorage.getItem("userName")
		})
	});
	if(isBrowser()){
	// async function SendDetail(){
	// 	const h=await isBrowser()&&fetch("http://192.168.56.101:8585",sendData);
	// 	//return await h.json()
	// }
	// SendDetail().then(resp=>{
	// 	if(resp.status=="Failed"){
	// 		return true
	// 	}
	// 	else{return false}
	//  })
	// }
	}
}

const isLoggedIn=()=>{
	const k=({
		method:'GET',
		headers:{'authorization':isBrowser()&&window.localStorage.getItem("authToken")}
	});
	if(isBrowser()){
	async function GetLoggedIn(){
		const w=await fetch("http://192.168.0.106:8888",k);
		return await w.json()
	}
	GetLoggedIn().then(resp=>{
		if(resp.status=="OK"){ 
			return true}
			else{return false}
		})
	}
}


export {GetAuthentication,isAuthenticated,isLoggedIn};
