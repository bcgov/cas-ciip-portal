import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {registrationQueryResponse} from 'registrationQuery.graphql';
import FormEditUser from '../containers/Forms/FormEditUser';
import DefaultLayout from '../layouts/default-layout';

interface Props {
  query: registrationQueryResponse['query'];
}

class Registration extends Component<Props> {
  static query = graphql`
    query registrationQuery {
      query {
        session {
          ...Header_session
        }
        user(id: "WyJ1c2VycyIsMV0=") {
          ...FormEditUser_user
        }
      }
    }
  `;

  render() {
    const {user, session} = this.props.query;

    return (
      <DefaultLayout title="Registration" session={session}>
        <h4 className="mb-5">Please verify or update your information</h4>
        <FormEditUser user={user} />
      </DefaultLayout>
    );
  }
}

export default Registration;
