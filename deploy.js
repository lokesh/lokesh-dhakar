var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

var config = {
	username: "lokesh",
	host: "lokeshdhakar.com",
	port: 21,
	localRoot: __dirname + "/dist",
	remoteRoot: "/home/lokesh/webapps/lokeshdhakar/",
	exclude: ['.git', '.idea', 'tmp/*']
}

ftpDeploy.deploy(config, function(err) {
	if (err) {
		console.log(err)
	} else {
		console.log('finished');
	}
});
