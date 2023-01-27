const {Server} = require('socket.io');

function ChatServer(app,mysqlhandler){

	const io = new Server(app,{cors:{origin:'*'}})
	const clientArr=new Array();
	const serverArr=new Array();
	const socket_collection=new Array();
		
	io.of("/chat").on('connection', function (socket) {
		let tempObj=new Object();
		socket.on('sendDetails',(data)=>{

			const socket_check = socket_collection.findIndex(check_socket_present=>{
				return check_socket_present.user_id == data.user_id 
			})
			if(socket_check == -1){
				tempObj['id']=socket.id;
				tempObj['connectTo']=data.ConnectTo;
				tempObj['Name']=data.Name;
				tempObj['user_id']=data.user_id
				tempObj['destination_id'] = data.destination_id
				tempObj['source_id'] = data.source_id;
				socket_collection.push(tempObj);
			}
			
		
			socket.emit('online_users',{'data':socket_collection});

			mysqlhandler.query(`SELECT * from chat where (source_user_id='${data.user_id}' and destination_id='${data.destination_id}') or ( destination_id='${data.source_id}' and destination_user_id='${data.user_id}');`,(er1,su1,field1)=>{
				socket.emit('fetch_data',{'data':{msg:su1}})					
			})
			
			socket.on('sendTyping',(data)=>{
				const typingto=data.To;
				socket_collection.map(k=>{
					if(k['Name']==typingto){
						socket.to(k.id).emit('RecvTyping',{'data':'Typing'})
					}
				})
			})

			//socket.broadcast.emit('online',{'msg':'OK'});
			socket.on("client_connect_status",(requested_client)=>{
				socket.broadcast.emit('get_online_status',{data:{name:requested_client.Name}});
			})
			socket.on("Stop_typing",(data)=>{
				const stop_type=data.receiver;
				console.log(socket_collection)
					socket_collection.map(k=>{
						if(k['Name']==stop_type){
							console.log("ok")
							socket.to(k.id).emit('Stop',{'data':'Stop'})
						}
					})
			})


			socket.on('ClientMsg',(data)=>{
				const currenttime=new Date()
				const day=currenttime.getDay();
				const month=currenttime.getMonth();
				const year=currenttime.getFullYear()

				const gettime =  currenttime.toString().split(" ")[4]
				const timestamp=year+"-"+month+"-"+day+" "+gettime;
					console.log(timestamp)

				mysqlhandler.query(`SELECT * FROM session WHERE user_id='${data.user_id}';`,(err,result,fields)=>{
					if(result){
						mysqlhandler.query(`SELECT user_id from login where account_id='${data.destination_id}';`,(desterr,destsucc,destfield)=>{											
							mysqlhandler.query(`INSERT INTO chat(updated_at,msg,source_id,destination_id,source_user_id,destination_user_id)VALUES('${timestamp}','${data.msg}','${data.source_id}','${data.destination_id}','${data.user_id}','${destsucc[0].user_id}');`,(e2,r2,f2)=>{
								console.log(e2,r2)
							})
																			
						})	
						
						socket_collection.map(user_connection=>{		
							if(user_connection['Name'] == data.receiver){
								const targetid=user_connection.id;											
								socket.to(targetid).emit('PrivateMsg',{'usermsg':data.msg,'source_id':data.source_id});
							}
						})
					}else{
						socket.emit('Unauthorized',{data:'You Need to Login Before Chat',statusCode:401});
					}
				});
			socket.on('Sended',(idhandler)=>{
				mysqlhandler.query(`INSERT INTO chat(Token,FromClient,ToClient,Timeshow,Msg)VALUES('${socket_collection['authorization']}','${socket_collection['id']}',"${idhandler.id}",'${timestamp}','${socket_collection['msg']}');`);
			});

		});

		mysqlhandler.query(`SELECT * FROM chat where Token='${socket.authorization}';`,(err,result,fields)=>{
			if(result){
				result.map(key=>{
					clientArr.push([key.ToClient]=key.Timeshow);
					serverArr.push([key.FromClient]=key.Timeshow);
				});
				socket.emit('GetData',{'data':socket.authorization,'FromClient':serverArr,'ToClient':clientArr});
			}else{
				socket.emit('Unauthorized',{data:'You Need to Login Before Chat',statusCode:401});
			}
		})

			socket.emit('Connected',{'data':'OK'});

		});
		
		socket.on('disconnect',(test)=>{
			
			socket_collection.map(key=>{
				if(socket.id == key.id){
					const myIndex=socket_collection.findIndex(k=>k.id==socket.id)
					delete socket_collection.splice(myIndex,1);
					socket.broadcast.emit('offline',{'offlineMsg':'Disconnected'})
				}
			});
		})
	});

	const Audiodata=new Array();
	const getId=new Array();
	io.of('/audiocall').on('connection',(socket)=>{
		getId.push(socket.id)
		socket.on('getAudioDetail',(data1)=>{
			if(getId.indexOf(socket.id)){
				getId.pop(socket.id)
				data1['id']=socket.id
				Audiodata.push(data1);

				socket.emit('ReceiveID',socket.id);
				getId.map(kw=>{
					socket.emit("ReceiveUser",{'usernameID':kw});
				})
			}
		})

		socket.on('CallUser',(data1)=>{
			socket.to(data1.userToCall).emit("GetCall",{'signal':data1.signaldata,'from':data1.from})
		})
		socket.on('disconnect', () => {
			Audiodata.map(p=>{
				if(p.id==socket.id){
					delete p[socket.id];
				}	 		
			})
		})
		socket.on('acceptCall',(data)=>{
			io.to(data.to).emit('callAccepted',data.signal);
		}) 
	})


	const Videodata=new Array();
	const VideoID=new Array();
	io.of('/video').on('connection',(socket)=>{
		VideoID.push(socket.id)
		socket.on('videoDetail',(datas)=>{
			if(VideoID.indexOf(socket.id)){
				VideoID.pop(socket.id)
				Videodata['id']=socket.id
				Videodata.push(datas);
				socket.emit('call_id',{from_id:socket.id,to_id:VideoID});

			}
		});
		socket.on('SignalReceived',(data6)=>{
			socket.to(data6.to).emit('CallingToReceiver',{'data':'Calling'})
		});
	})
}
module.exports =  ChatServer