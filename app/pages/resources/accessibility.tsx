import React, { Component } from "react";
import { graphql } from "react-relay";
import type { CiipPageComponentProps } from "types";
import { accessibilityQueryResponse } from "accessibilityQuery.graphql";
import DefaultLayout from "layouts/default-layout";

interface Props extends CiipPageComponentProps {
  query: accessibilityQueryResponse["query"];
}

class Accessibility extends Component<Props> {
  static query = graphql`
    query accessibilityQuery {
      query {
        session {
          ...defaultLayout_session
        }
      }
    }
  `;

  // TODO: Add content to this empty page
  render() {
    const { query } = this.props;
    const { session } = query || {};
    return <DefaultLayout session={session} title="Accessibility" />;
  }
}

export default Accessibility;
