import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { graphql } from "react-relay";
import type { CiipPageComponentProps } from "types";
import { analystQueryResponse } from "analystQuery.graphql";
import DefaultLayout from "layouts/default-layout";
import ReportingOperations from "components/Dashboard/reportingOperations";
import ProgramAdministration from "components/Dashboard/programAdministration";
import ReportAProblem from "components/Dashboard/reportAProblem";
import getConfig from "next/config";
import { INCENTIVE_ANALYST } from "data/group-constants";

const ALLOWED_GROUPS = [INCENTIVE_ANALYST];

interface Props extends CiipPageComponentProps {
  query: analystQueryResponse["query"];
}
class Analyst extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query analystQuery {
      query {
        session {
          ...defaultLayout_session
        }
      }
    }
  `;

  render() {
    const {
      query: { session },
    } = this.props;
    const supportUrl = getConfig()?.publicRuntimeConfig.SUPPORT_EMAIL;
    return (
      <DefaultLayout session={session} title="Analyst Dashboard">
        <div>
          <Row>
            <ProgramAdministration viewOnly />
            <ReportingOperations />
            <ReportAProblem
              supportUrl={
                `mailto:${supportUrl}?subject=Internal Support Request` || "#"
              }
            />
          </Row>

          <style global jsx>
            {`
              .buttons {
                padding: 15px;
                margin: 0 0 25px 0;
              }
              .admin-control-card {
                width: 18rem;
                margin: 20px;
              }
            `}
          </style>
        </div>
      </DefaultLayout>
    );
  }
}

export default Analyst;
