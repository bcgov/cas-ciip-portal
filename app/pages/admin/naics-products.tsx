import React, { Component } from "react";
import { graphql } from "react-relay";
import { naicsProductsAssociationsQueryResponse } from "naicsProductsAssociationsQuery.graphql";
import DefaultLayout from "layouts/default-layout";
import { ADMIN_GROUP } from "data/group-constants";
import NaicsCodeProductAssociationComponent from "containers/Admin/ProductNaicsCode/ProductNaicsCodeAssociation";

const ALLOWED_GROUPS = ADMIN_GROUP;

interface Props {
  query: naicsProductsAssociationsQueryResponse["query"];
}

class NaicsProductsAssociations extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query naicsProductsAssociationsQuery($naicsCodeId: ID!) {
      query {
        ...ProductNaicsCodeAssociation_query
          @arguments(naicsCodeId: $naicsCodeId)
        session {
          ...defaultLayout_session
        }
      }
    }
  `;

  static async getInitialProps() {
    return {
      variables: {
        naicsCodeId: "",
      },
    };
  }

  render() {
    const { query } = this.props;
    return (
      <DefaultLayout
        session={query.session}
        title="Allowable Products by Industry (NAICS)"
      >
        <NaicsCodeProductAssociationComponent query={query} />
      </DefaultLayout>
    );
  }
}

export default NaicsProductsAssociations;
