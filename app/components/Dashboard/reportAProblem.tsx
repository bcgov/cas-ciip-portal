import React from "react";
import { Card } from "react-bootstrap";

interface Props {
  supportUrl: string;
}

const ReportAProblem: React.FunctionComponent<Props> = ({ supportUrl }) => {
  return (
    <Card className="admin-control-card">
      <Card.Body
        style={{
          height: 324,
          background: "#f5f5f5",
          display: "flex",
          alignItems: "center",
        }}
      >
        <p>
          <span role="img" aria-label="waving hand">
            👋
          </span>{" "}
          Something wrong?
          <br />
          <a href={supportUrl}>Report a problem</a> to the development team.
        </p>
      </Card.Body>
      <style jsx>{`
        p {
          font-weight: bold;
          text-align: center;
          margin: 0;
        }
      `}</style>
    </Card>
  );
};

export default ReportAProblem;
