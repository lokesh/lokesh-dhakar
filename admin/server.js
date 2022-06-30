const cors = require('cors');
const fs = require('fs');
const { resolve } = require('path');

// load up the express framework and body-parser helper
const express = require('express');
// const bodyParser = require('body-parser');

// create an instance of express to serve our end points
const app = express();

app.use(cors({
    origin: '*'
}));

// configure our express instance with some body-parser settings
// including handling JSON data
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  // fs.writeFileSync(videosFilePath, JSON.stringify(videos, null, 2));
  const VENUES_METADATA_FILE_PATH = resolve(process.cwd(), 'src/data/venues-metadata.json');
  fs.writeFileSync(VENUES_METADATA_FILE_PATH, JSON.stringify(req.body, null, 2));

  res.sendStatus(200);
})

// finally, launch our server on port 3001.
const server = app.listen(3001, () => {
  console.log('listening on port %s...', server.address().port);
});