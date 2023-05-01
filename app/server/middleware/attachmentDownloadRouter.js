const { Router } = require("express");
const { performQuery } = require("../postgraphile/graphql");
const { Storage } = require("@google-cloud/storage");

const attachmentDownloadRouter = Router();

const attachmentDetailsQuery = `query AttachmentDetailsQuery($attachmentId: ID!){
  attachment(id: $attachmentId) {
    file
    fileName
    fileType
  }
}`;

const handleDownload = async (req, res, next) => {
  const attachmentQueryVariables = {
    attachmentId: req.params.attachmentId,
  };

  // try to download
  try {
    // perform query to get file details from db
    const result = await performQuery(
      attachmentDetailsQuery,
      attachmentQueryVariables,
      req
    );

    const {
      data: {
        attachment: { file, fileName, fileType },
      },
    } = result;

    // create google storage client
    const storageClient = new Storage();

    // bucket name
    const bucketName = storageClient.bucket(process.env.ATTACHMENTS_BUCKET)
      .name;

    // get the metadata for the file from the bucket
    const [metadata] = await storageClient
      .bucket(bucketName)
      .file(file)
      .getMetadata();

    // set response headers
    res.setHeader("Content-Length", metadata.size);
    res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
    res.setHeader("Content-Type", fileType);

    // pipe the file data from the bucket as a response
    await storageClient
      .bucket(bucketName)
      .file(file)
      .createReadStream()
      .pipe(res);
  } catch (error) {
    next(error);
  }
};

attachmentDownloadRouter.get("/download/:attachmentId", handleDownload);

module.exports = { attachmentDownloadRouter, handleDownload };
