import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {registrationQueryResponse} from 'registrationQuery.graphql';
import {CiipPageComponentProps} from 'next-env';
import UserInformationForm from '../containers/User/UserForm';
import DefaultLayout from '../layouts/default-layout';

interface Props extends CiipPageComponentProps {
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
    const {
      query: {session},
      router
    } = this.props;

    return (
      <DefaultLayout title="Registration" session={session} needsUser={false}>
        <h4 className="mb-5">Please verify or update your information</h4>
        <UserInformationForm
          user={session ? session.userBySub : undefined}
          sessionSub={session.sub}
          onSubmit={async () => router.push('/user-dashboard')}
        />
      </DefaultLayout>
    );
  }
}

export default Registration;
