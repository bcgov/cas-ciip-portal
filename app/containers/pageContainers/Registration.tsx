import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {RegistrationQueryResponse} from '__generated__/RegistrationQuery.graphql';
import FormEditUser from '../Forms/FormEditUser';
import DefaultLayout from '../../layouts/default-layout';

interface Props {
  query: RegistrationQueryResponse['query'];
}

class Registration extends Component<Props> {
  static query = graphql`
    query RegistrationQuery {
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
