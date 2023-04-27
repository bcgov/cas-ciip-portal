const Router = require("express");
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

  try {
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

    const storageClient = new Storage();
    const bucketName = storageClient.bucket(process.env.ATTACHMENTS_BUCKET)
      .name;

    const [metadata] = await storageClient
      .bucket(bucketName)
      .file(file)
      .getMetadata();

    res.setHeader("Content-Length", metadata.size);
    res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
    res.setHeader("Content-Type", fileType);

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
