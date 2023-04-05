const { Storage } = require("@google-cloud/storage");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

console.log("im in resolvefileupload"); // brianna this called
async function saveRemoteFile({ stream }) {
  console.log("im in saveremotefile"); // brianna this not called
  const storageClient = new Storage();
  const bucket = storageClient.bucket(process.env.ATTACHMENTS_BUCKET);

  console.log("bucket", bucket); // ok till here
  return new Promise((resolve, reject) => {
    const uuid = crypto.randomUUID();
    console.log("brianna uuid", uuid);
    const file = bucket.file(uuid);
    const writeStream = file.createWriteStream();

    stream
      .pipe(writeStream)
      .on("finish", () => resolve({ uuid }))
      .on("error", (err) => reject(err));
  });
}

async function resolveFileUpload(upload) {
  console.log("im in resolvefileuploadfunction");
  console.log("upload in resolvefileupload", upload);
  const { createReadStream } = upload;
  const stream = createReadStream();

  // Save tile to remote storage system
  const { uuid } = await saveRemoteFile({ stream });
  console.log("uuid in resolvefileupload", uuid);
  return uuid;
}

module.exports = { resolveFileUpload };
