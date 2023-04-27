const { saveRemoteFile } = require("./saveRemoteFile");

const myfunc = () => "lalal";

async function resolveFileUpload(upload) {
  if (upload.mimetype !== "application/pdf") {
    throw new Error("Only PDF format is accepted");
  }
  myfunc();
  // console.log("upload", upload);
  const { createReadStream } = upload;
  const stream = createReadStream();
  // console.log("$$$$$stream,", stream);
  // console.log("saveremotefile", saveRemoteFile);

  // Save tile to remote storage system
  const remoteFile = await saveRemoteFile({ stream });
  // return remoteFile.uuid;
  return "ladela";
}

module.exports = { resolveFileUpload };
