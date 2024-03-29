const { Storage } = require("@google-cloud/storage");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

async function saveRemoteFile({ stream }) {
  const storageClient = new Storage();
  const bucket = storageClient.bucket(process.env.ATTACHMENTS_BUCKET);

  return new Promise((resolve, reject) => {
    const uuid = crypto.randomUUID();
    const file = bucket.file(uuid);
    const writeStream = file.createWriteStream();

    stream
      .pipe(writeStream)
      .on("finish", () => resolve({ uuid }))
      .on("error", (err) => reject(err));
  });
}

module.exports = { saveRemoteFile };
