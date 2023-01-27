const mysql = require('mysql');

const connectionhandler=mysql.createConnection({
		host:'localhost',
		user:'root',
		password:'test',
		port:3306,
		charset : 'utf8mb4',
		database:"video"
			});
	connectionhandler.connect((err)=>{
		if(!err){
			console.log("DB connected");
		}else{console.log("DB Connection Error")}
	});



module.exports = connectionhandler; 