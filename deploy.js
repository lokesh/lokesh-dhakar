const fs = require("fs");
const path = require("path");
const SftpClient = require("ssh2-sftp-client");
require("dotenv").config();

const localDir = path.join(__dirname, "dist");
const remoteDir = process.env.REMOTE_PATH;

const config = {
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  port: process.env.PORT || 22,
  readyTimeout: 30000,
};

/**
 * Recursively collect all files in a directory.
 */
function getLocalFiles(dir, base = dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".DS_Store") continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getLocalFiles(fullPath, base));
    } else {
      const stat = fs.statSync(fullPath);
      results.push({
        localPath: fullPath,
        relativePath: path.relative(base, fullPath),
        size: stat.size,
      });
    }
  }
  return results;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Recursively list remote files, returning a Map of relativePath -> { size }.
 */
async function getRemoteFiles(client, dirPath, base = dirPath) {
  const remoteFiles = new Map();
  try {
    const entries = await client.list(dirPath);
    for (const entry of entries) {
      if (entry.name === "." || entry.name === "..") continue;
      const remotePath = `${dirPath}/${entry.name}`;
      if (entry.type === "d") {
        const subFiles = await getRemoteFiles(client, remotePath, base);
        for (const [k, v] of subFiles) remoteFiles.set(k, v);
      } else {
        remoteFiles.set(path.relative(base, remotePath), { size: entry.size });
      }
    }
  } catch {
    // Remote dir may not exist yet
  }
  return remoteFiles;
}

async function main() {
  const client = new SftpClient();

  console.log(`Deploying to ${config.host}:${remoteDir}\n`);

  await client.connect(config);
  console.log("Connected.\n");

  const localFiles = getLocalFiles(localDir);
  const totalSize = localFiles.reduce((sum, f) => sum + f.size, 0);
  console.log(`${localFiles.length} files (${formatBytes(totalSize)}) in dist/\n`);

  // Compare with remote to skip unchanged files
  console.log("Scanning remote files...");
  const remoteFiles = await getRemoteFiles(client, remoteDir);
  console.log(`${remoteFiles.size} files on remote.\n`);

  const toUpload = localFiles.filter((f) => {
    const remote = remoteFiles.get(f.relativePath);
    return !remote || remote.size !== f.size;
  });

  const skipped = localFiles.length - toUpload.length;
  if (skipped > 0) {
    console.log(`Skipping ${skipped} unchanged files.`);
  }

  if (toUpload.length === 0) {
    console.log("Everything up to date.");
    await client.end();
    return;
  }

  const uploadSize = toUpload.reduce((sum, f) => sum + f.size, 0);
  console.log(`Uploading ${toUpload.length} files (${formatBytes(uploadSize)})...\n`);

  const createdDirs = new Set();
  let uploaded = 0;
  let uploadedBytes = 0;

  for (const file of toUpload) {
    const remotePath = `${remoteDir}/${file.relativePath}`;
    const remoteFileDir = path.dirname(remotePath);

    if (!createdDirs.has(remoteFileDir)) {
      await client.mkdir(remoteFileDir, true);
      createdDirs.add(remoteFileDir);
    }

    await client.put(file.localPath, remotePath);
    uploaded++;
    uploadedBytes += file.size;

    const pct = Math.round((uploaded / toUpload.length) * 100);
    console.log(`[${uploaded}/${toUpload.length}] ${pct}%  ${file.relativePath} (${formatBytes(file.size)})`);
  }

  console.log(`\nUploaded ${formatBytes(uploadedBytes)} in ${uploaded} files.`);
  await client.end();
}

main()
  .then(() => {
    console.log("Deploy complete!");
  })
  .catch((err) => {
    console.error(`Deploy failed: ${err.message}`);
    process.exit(1);
  });
