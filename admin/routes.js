const appRouter = (app, fs) => {

	app.get('/', (req, res) => {
		res.send('welcome to the development api-server');
	});

	app.post('/', (req, res) => {
	  console.log('body', req.body);
	  res.sendStatus(200);
	})

};

module.exports = appRouter;