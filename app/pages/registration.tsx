import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {registrationQueryResponse} from 'registrationQuery.graphql';
import UserInformationForm from '../containers/User/UserForm';
import DefaultLayout from '../layouts/default-layout';

interface Props {
  query: registrationQueryResponse['query'];
}

class Registration extends Component<Props> {
  static query = graphql`
    query registrationQuery {
      query {
        session {
          ...defaultLayout_session
          sub
          userBySub {
            ...UserForm_user
          }
        }
      }
    }
  `;

  render() {
    const {session} = this.props.query;

    return (
      <DefaultLayout title="Registration" session={session} needsUser={false}>
        <h4 className="mb-5">Please verify or update your information</h4>
        <UserInformationForm
          user={session ? session.userBySub : undefined}
          sessionSub={session.sub}
        />
      </DefaultLayout>
    );
  }
}

export default Registration;
