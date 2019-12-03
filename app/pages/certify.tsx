import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {certifyQueryResponse} from 'certifyQuery.graphql';
import uuidv4 from 'uuid/v4';
import DefaultLayout from '../layouts/default-layout';

interface Props {
  query: certifyQueryResponse['query'];
  router: any;
}

class Applications extends Component<Props> {
  static query = graphql`
    query certifyQuery {
      query {
        session {
          ...defaultLayout_session
        }
      }
    }
  `;

  render() {
    const {query, router} = this.props;
    const uuid = uuidv4();
    console.log(this.props);
    console.log(uuid);
    return (
      <>
        <DefaultLayout
          title="Submission Certification"
          session={query.session}
          needsUser={false}
          needsSession={false}
        >
          {router.query.url ? router.query.url : 'Nothing to see here'}
        </DefaultLayout>
      </>
    );
  }
}

export default Applications;
