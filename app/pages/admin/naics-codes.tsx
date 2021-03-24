import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {naicsCodesQueryResponse} from 'naicsCodesQuery.graphql';
import NaicsCodeTable from 'containers/Admin/NaicsCode/NaicsCodeTable';
import DefaultLayout from 'layouts/default-layout';
import {ADMIN_GROUP} from 'data/group-constants';

const ALLOWED_GROUPS = ADMIN_GROUP;

interface Props {
  query: naicsCodesQueryResponse['query'];
}

class NaicsCodes extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query naicsCodesQuery {
      query {
        ...NaicsCodeTable_query
        session {
          ...defaultLayout_session
        }
      }
    }
  `;

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout session={query.session} title="NAICS Codes">
        <NaicsCodeTable query={query} />
      </DefaultLayout>
    );
  }
}

export default NaicsCodes;
