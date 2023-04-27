const { saveRemoteFile } = require("./saveRemoteFile");

async function resolveFileUpload(upload) {
  if (upload.mimetype !== "application/pdf") {
    throw new Error("Only PDF format is accepted");
  }
  const { createReadStream } = upload;
  const stream = createReadStream();
  const fileSize = stream._writeStream._writableState.length;
  if (fileSize > 50000000) {
    throw new Error("Files must be smaller than 50MB");
  }

  // Save tile to remote storage system
  const { uuid } = await saveRemoteFile({ stream });
  // return remoteFile.uuid;
  return uuid;
}

module.exports = { resolveFileUpload };
