const { Router } = require("express");
const { performQuery } = require("../postgraphile/graphql");
const { Storage } = require("@google-cloud/storage");

const attachmentDeleteRouter = Router();

const attachmentDetailsQuery = `query AttachmentDetailsQuery($attachmentId: ID!){
  attachment(id: $attachmentId) {
    file
  }
}`;

const handleDelete = async (req, res, next) => {
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
        attachment: { file },
      },
    } = result;

    const storageClient = new Storage();
    const bucket = storageClient.bucket(process.env.ATTACHMENTS_BUCKET);

    await storageClient.bucket(bucket.name).file(file).delete();
    console.log(`gs://${bucket.name}/${file} deleted`);
  } catch (error) {
    next(error);
  }
};

attachmentDeleteRouter.get("/delete/:attachmentId", handleDelete);

module.exports = attachmentDeleteRouter;
