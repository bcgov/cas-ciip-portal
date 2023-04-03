import { FilePicker } from "@button-inc/bcgov-theme";
import LoadingSpinner from "components/LoadingSpinner";
import React from "react";
import { RelayProp } from "react-relay";
import createAttachmentMutation from "mutations/application/createAttachmentMutation";
import { SubmitApplication_applicationRevision } from "__generated__/SubmitApplication_applicationRevision.graphql";
import { Row, Col } from "react-bootstrap";

function formatBytes(bytes: number, decimals = 2) {
  if (bytes <= 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

interface Props {
  applicationRevisionId: SubmitApplication_applicationRevision;
  relay: RelayProp;
}
export const AttachmentUploadComponent: React.FunctionComponent<Props> = ({
  applicationRevisionId,
  relay,
}) => {
  console.log("applicationRevisionId", applicationRevisionId);

  const saveAttachment = async (e) => {
    const { environment } = relay;
    const file = e.target.files[0];
    console.log("file", file);
    const variables = {
      input: {
        attachment: {
          file: file,
          fileName: file.name,
          fileSize: formatBytes(file.size),
          fileType: file.type,
          applicationId: applicationRevisionId,
        },
      },
      // connections: [applicationRevision.applicationId.attachments.__id], //brianna
    };

    await createAttachmentMutation(environment, variables);
  };

  const isCreatingAttachment = false; // brianna

  return (
    <div className="card">
      <div className="card-header">
        <Row>
          <Col md={8}>
            <h1>Verification Statement</h1>
          </Col>
        </Row>
      </div>
      <Row style={{ padding: "0 2em 2em 2em" }}>
        <Col xs={12} style={{ margin: "20px 0 20px" }}>
          {isCreatingAttachment ? (
            <div>
              <div className="loadingSpinnerContainer">
                <LoadingSpinner></LoadingSpinner>
                <span>Uploading file...</span>
              </div>
            </div>
          ) : (
            <div className="upload-button-container">
              <FilePicker onChange={saveAttachment} name={"upload-attachment"}>
                Upload New Attachment
              </FilePicker>
            </div>
          )}
        </Col>
      </Row>
      <style jsx>{`
        .card {
          border-color: #a4a4a4;
          background-color: #f4f4f4;
        }
        .card-header {
          background-color: #036;
          color: #fff;
        }
        .card-header h1 {
          margin-bottom: 0;
          font-size: 30px;
          display: inline-block;
        }
        .upload-button-container {
        margin top: 2em;
          height: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }

      `}</style>
    </div>
  );
};

// brianna what are you looking for here
export default AttachmentUploadComponent;
