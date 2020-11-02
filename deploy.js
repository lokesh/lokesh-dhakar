const fs = require('fs');
const path = require('path');
let SftpClient = require('ssh2-sftp-client');

const credentials = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), '.private'), 'utf-8'));
const { host, port, username, password, remoteRoot } = credentials.sftp;

async function main() {
  const client = new SftpClient();
  const src = path.join(__dirname, 'dist');
  const dist = remoteRoot + 'foo/*';

  // Delete dir?

  try {

    await client.connect({
      host,
      username,
      password,
      port,
    });
    console.log(dist);
    let rslt = await client.delete(dist);
    // return `✅ Success: ${rslt}`;
  } finally {
    client.end();
  }

  // Upload dir
  // try {
  //   await client.connect({
  //     host,
  //     username,
  //     password,
  //     port,
  //   });
  //   client.on('upload', info => {
  //     console.log(`Uploaded: ${info.source}`);
  //   });
  //   let rslt = await client.uploadDir(src, dist);
  //   return `✅ Success: ${rslt}`;
  // } finally {
  //   client.end();
  // }
}

main()
  .then(msg => {
    console.log(msg);
  })
  .catch(err => {
    console.log(`main error: ${err.message}`);
  });
