const nodemail = require('nodemailer')

const transport=nodemail.createTransport({
	service:"gmx",
	auth:{
			user:'testt@gmx.com',
			pass:'Test@22233'
	},
	port:465,
	host:"mail.gmx.com",
	secure:true
});

module.exports = transport;
