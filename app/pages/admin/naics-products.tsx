import React, {Component} from 'react';
import {graphql} from 'react-relay';
import DefaultLayout from 'layouts/default-layout';
import {ADMIN_GROUP} from 'data/group-constants';
import NaicsCodeList from 'containers/Admin/NaicsCode/NaicsCodeList';

const ALLOWED_GROUPS = ADMIN_GROUP;

interface Props {
  query: naicsCodesProductsQueryResponse['query'];
}

class NaicsProductsAssociations extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query naicsProductsAssociationsQuery {
      query {
        ...NaicsCodeList_query
        session {
          ...defaultLayout_session
        }
      }
    }
  `;

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout
        session={query.session}
        title="Allowable Products by Industry (NAICS)"
      >
        <h1>NAICS AND PRODUCTS</h1>
        <NaicsCodeList query={query} />
      </DefaultLayout>
    );
  }
}

export default NaicsProductsAssociations;
