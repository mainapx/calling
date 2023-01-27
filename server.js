const  express = require('express');
const  session = require('express-session');
const  tokenGenerator = require('rand-token');
const  fs = require('fs');
const  json = require('body-parser');
const dotenv = require('dotenv');
const  uuid4 = require('uuid').v4;
const  multer = require('multer');
const  urlencoded = require('body-parser');
const  https = require('https');
const  sha256 = require('sha256');
const  os = require('os');
const  cors = require('cors');
const  ChatServer = require('./chat.js');
const  mailservice = require('./mailer.js');
const  mysqlhandler = require('./dbconnection.js');

const app = express()
const uploader = multer({dest:'/tmp/'})
dotenv.config()
const options = {
	allowedHeaders: [
	  'Origin',
	  'X-Requested-With',
	  'Content-Type',
	  'Accept',
	  'X-Access-Token',
	],
	credentials: true,
	methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
	origin: '*',
	preflightContinue: false,
  };

  const myOptions={
	key:fs.readFileSync('server.pem'),
	cert:fs.readFileSync('servercrt.pem')
 };

app.use(json())
app.use(cors({origin:"*"}))
app.use(urlencoded({extended:false}))


app.use(session({
	secret: 'Your_Secret_Key',
	resave: true,
	saveUninitialized: true
}))

const headershandler={
	'Access-Control-Allow-Origin':'*',
	'Access-Control-Allow-Methods':"OPTIONS,GET,PUT,POST",
	'Access-Control-Allow-Headers':'Content-Type,Video-Email,authorization',
	'Content-Type':'application/json',
}

app.get("/",(req,resp)=>{
	resp.json({"status":'ok'})
})
app.post("/user/api/login",(req,resp)=>{
	const body = req.body

	const session_token = sha256(tokenGenerator.generate(100))
	const login_username=body.Username;
	const login_password=body.Password;
	if(login_username && login_password==""){
		resp.set(headershandler)
		resp.status(400)
		resp.json({'status':'Failed','message':'Invalid Parameters'})
	}else{

	mysqlhandler.query(`SELECT * FROM login WHERE email='${login_username}' AND password='${sha256(login_password)}';`,(err,result,fields)=>{
		if(result.length == 0){	
			resp.set(headershandler)				
			resp.status(400)
			resp.json({'status':'Failed','message':'Invalid Username or Password'})
		}else{
		  const email_auth=login_username.toString();
		  mysqlhandler.query(`INSERT INTO session(user_id,session_token)VALUES('${result[0]['user_id']}','${session_token}');`,(ers,rsult,fields)=>{
			if(!ers){
				req.session.email = email_auth
				resp.set(headershandler)
				resp.status(200)
				resp.json({'status':'OK','message':'Success','data':result,token:session_token})
			}else{
				resp.set(headershandler)	
				resp.status(400);
				resp.json({'status':'Failed','message':'Something is Wrong with server'})
			}
		  })

		}	
	})
}})

app.post("/user/api/register",(req,resp)=>{
	const register_body = req.body;
	const register_firstname=register_body.Firstname;
	const register_lastname=register_body.Lastname;
	const register_emailid=register_body.Emailid;
	const register_password=register_body.Password;
	const register_phone=register_body.Phone;
	const tokenhandler=tokenGenerator.generate(100);
	const user_id = uuid4()

	mysqlhandler.query(`SELECT * from register where email='${register_emailid}';`,(ers,results,field)=>{
		if(results.length == 0){
			mysqlhandler.query(`INSERT INTO register(firstname,lastname,email,phone,user_id,password,created_at)VALUES('${register_firstname}','${register_lastname}','${register_emailid}','${register_phone}','${user_id}','${sha256(register_password)}','${new Date().toISOString().slice(0, 19).replace('T', ' ')}');`,(err,result,fields)=>{
				if(err==null){
					const  otpvalue=Math.floor(Math.random()*1000000).toString();
					const acc_id =  Math.floor(Math.random()*10000000).toString()
					mysqlhandler.query(`INSERT INTO login(email,password,user_id,firstname,lastname,phone,otp,is_login,account_id,profile_picture)VALUES('${register_emailid}','${sha256(register_password)}','${user_id}','${register_firstname}','${register_lastname}','${register_phone}','${otpvalue}','${false}','${acc_id}','');`,(err,result,fields)=>{
						resp.set(headershandler)
						resp.status(201);
						resp.json({'status':'OK','clientToken':tokenhandler,'emailAccount':register_emailid,'firstname':register_firstname,'lastname':register_lastname,account_id:acc_id})})
				}else{
					resp.set(headershandler)
					resp.status(400);
					resp.json({'status':'Failed','message':'Something is Wrong with server'})
				}
			});
		}else{
			resp.set(headershandler)
			resp.status(400)
			resp.json({'status':'Failed','message':'The Email is Associated with Different Accounts'})
		}
	})	
})

app.get("/profile/:id",(req,resp)=>{
	const getuser_id = req.params.id
	const getauthorization = req.query.access_token
		mysqlhandler.query(`SELECT * from login where user_id='${getuser_id.split(".")[0]}'`,(err,success,fields)=>{
			if(success.length !=0){
				resp.sendFile(`./upload/profile/${getuser_id}`,{root:'.'})
			}else{
				resp.json({
					"Status":"Failed",
					"message":"Invalid Authorization Token"
				})
			}
		})
	// }else{
	// 	resp.set(headershandler)
	// 	resp.status(403);
	// 	resp.json({
	// 		"Status":"Failed",
	// 		"message":"You need to Login"
	// 	})
	// }
})

app.post("/user/api/profile_change/",uploader.single('change_profile'),(req,resp)=>{
	const account_id = req.body.account_id
	const session_token = req.body.authorization
	const user_id = req.body.user_id
	const avatar_body = req.file;
	const path = 'upload/profile' + '/' + user_id+"."+req.file.originalname.toString().split(".").pop()
	fs.rename(req.file.path, path, function(err) {
			if(req.file.originalname.endsWith(".jpg") || req.file.originalname.endsWith(".webp") || req.file.originalname.endsWith(".jpeg") || req.file.originalname.endsWith(".png")){
				const image_id = user_id+"."+req.file.originalname.split(".").pop()
				const profile_url = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/profile/${image_id}?access_token=${session_token}`
				mysqlhandler.query(`UPDATE login set profile_picture='${profile_url}' where user_id='${user_id}' and account_id='${account_id}';`,(err,response,fields)=>{					
					if(!err){
						resp.set(headershandler)	
						resp.status(200)
						resp.json({Status:'OK',message:'Profile Changed Successfully',profile_url:profile_url})
					}else{
						console.log(err)
					}
				})

				
			}else{
				resp.set(headershandler)
				resp.status(422)
				resp.json({Status:'Failed',message:'Invalid Image file'})
			}

	});
})

app.put("/user/api/otp",(req,resp)=>{
	const otp_body = req.body
	request_token=otp_body.authorization;
	request_email=otp_body.emailid;
	request_otp=otp_body.otp;

	mysqlhandler.query(`SELECT * FROM register WHERE UID='${request_token}' AND Emailid='${request_email}';`,(err,result,fields)=>{
		if(result){
			mysqlhandler.query(`SELECT * from login where email='${request_email}' and otp='${request_otp}';`,(errs,results,fields)=>{
				if(results.length && results[0]['otp'] == request_otp){
					resp.set(headershandler)
					resp.status(200);
					resp.json({'status':'OK','message':'Success'})
				}
				else{
					resp.set(headershandler)
					resp.status(400);
					resp.json({'status':'Failed','message':'Invalid OTP'})
				}
			})
		}else{
			resp.set(headershandler)
			resp.status(401)
			resp.json({'status':"Failed",'message':'Unauthorized'})
		}
	})
})

app.put("/logout",(req,resp)=>{
	const get_email = req.body.auth_email
	resp.sendStatus(204)
})
app.put("/checklogin",(req,resp)=>{
	const check_email = req.body.usename
	if(req.session.check_email){
		resp.sendStatus(204)
	}else{
		resp.sendStatus(401)
		resp.json({'status':"Failed",'message':'Unauthorized'})
	}
})

app.post("/user/api/verification",(req,resp)=>{
	const otp_check_token = req.body
	const client_token_email=otp_check_token.email;

	mysqlhandler.query(`SELECT * FROM register WHERE email='${client_token_email}';`,(err,result,fields)=>{
		if(!err){
			mysqlhandler.query(`SELECT * from login  where email='${client_token_email}'`,(er,res,fields)=>{
				if(!er && res.length){
					const mailOptions={
						from:'testt@gmx.com',
						to:client_token_email,
						subject:'Verification Code for Account',
						text:res[0]['otp']
					}
		
					mailservice.sendMail(mailOptions,(err,info)=>{
						if(!err){
							resp.set(headershandler)
							resp.status(201);
							resp.json({'status':'OK','message':'Verification Code has been Sent'});
						}else{
							resp.set(headershandler)
							resp.status(429);
							resp.json({'status':'Failed','message':'Something is Wrong with our server please try again'});
						}
					})
				}else{
					resp.set(headershandler)
					resp.status(500);
					resp.json({'status':'Failed','message':'Something is Wrong with our server please try again'});				
				}
			})
		
		}else{
			resp.set(headershandler)
			resp.status(400)
			resp.json({'status':'Failed','message':'Unauthorized'});
		}
	})
})

app.get("/users/",(req,resp)=>{
	if(req.session){
		const authorization_token=req.headers['authorization'];
		const video_emailid=req.headers['video-email'];
		const user_id = req.headers['x-userid']
		mysqlhandler.query(`SELECT * FROM login WHERE user_id='${user_id}' AND email='${video_emailid}';`,(err,result,fields)=>{
			if(result){
				mysqlhandler.query(`SELECT firstname,profile_picture,account_id FROM login WHERE email NOT IN('${video_emailid}') AND user_id NOT IN('${user_id}');`,(err,result1,fields)=>{
					resp.set(headershandler)
					resp.status(200)
					const user_details = result1.map(key=>({
							firstname:key.firstname,account_id:key.account_id,profile_picture:key.profile_picture
						}
					))										
					resp.json({'status':'OK','message':'success','data':user_details})					
				})
			}else{
				resp.set(headershandler)
				resp.status(400)
				resp.json({'status':'Failed','message':'Invalid Paramters You Need to Login'})
			}		
		});
		
	}
})
const server_starting = https.createServer(myOptions,app)
const port = process.env.PORT
const server_instance = server_starting.listen(port,(e)=>{console.log(`HTTPS listening on ${port}`)})
ChatServer(server_instance,mysqlhandler)
