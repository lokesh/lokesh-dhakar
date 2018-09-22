const fs = require('fs');
const { resolve } = require('path');
const FtpDeploy = require('ftp-deploy');

const ftpDeploy = new FtpDeploy();

const credentials = JSON.parse(fs.readFileSync(resolve(process.cwd(), '.private'), 'utf-8'));

var config = {
  user: credentials.login.username,
  password: credentials.login.password,
  host: "lokeshdhakar.com",
	port: 21,
	localRoot: __dirname + '/dist',
	remoteRoot: "/home/lokesh/webapps/lokeshdhakar/",
	include: ['*', '**/*'],
  exclude: ['.*'],
  deleteRemote: false,
}

ftpDeploy.deploy(config, function(err) {
	if (err) {
		console.log(err)
	} else {
		console.log('finished');
	}
});
