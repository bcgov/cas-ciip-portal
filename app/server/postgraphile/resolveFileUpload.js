const Storage = require("@google-cloud/storage");
const crypto = require("crypto");

async function saveRemoteFile({ stream }) {
  const storageClient = new Storage();
  const bucket = storageClient.bucket("attachments"); //brianna

  return new Promise()((resolve, reject) => {
    const uuid = crypto.randomUUID();
    const file = bucket.file(uuid);
    const writeStream = file.createWriteStream();

    stream
      .pipe(writeStream)
      .on("finish", () => resolve({ uuid }))
      .on("error", (err) => reject(err));
  });
}

async function resolveFileUpload(upload) {
  const { createReadStream } = upload;
  const stream = createReadStream();

  // Save tile to remote storage system
  const { uuid } = await saveRemoteFile({ stream });

  return uuid;
}
