import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { graphql } from "react-relay";
import type { CiipPageComponentProps } from "types";
import { adminQueryResponse } from "adminQuery.graphql";
import DefaultLayout from "layouts/default-layout";
import UserManagement from "components/Dashboard/userManagement";
import ReportingOperations from "components/Dashboard/reportingOperations";
import ProgramAdministration from "components/Dashboard/programAdministration";
import ReportAProblem from "components/Dashboard/reportAProblem";
import getConfig from "next/config";
import { ADMIN_GROUP } from "data/group-constants";
import FormConfiguration from "components/Dashboard/formConfiguration";
import GgircsAppLink from "components/Dashboard/ggircsAppLink";

const ALLOWED_GROUPS = ADMIN_GROUP;

interface Props extends CiipPageComponentProps {
  query: adminQueryResponse["query"];
}
class Admin extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query adminQuery {
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
      <DefaultLayout session={session} title="Administrator Dashboard">
        <div>
          <Row>
            <ProgramAdministration />
            <ReportingOperations />
            <FormConfiguration />
            <UserManagement />
            <GgircsAppLink />
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

export default Admin;
