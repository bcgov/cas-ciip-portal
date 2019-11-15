import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {registrationQueryResponse} from 'registrationQuery.graphql';
import {CiipPageComponentProps} from 'next-env';
import UserForm from '../containers/User/UserForm';
import DefaultLayout from '../layouts/default-layout';

interface Props extends CiipPageComponentProps {
  query: registrationQueryResponse['query'];
}

class Registration extends Component<Props> {
  static query = graphql`
    query registrationQuery {
      query {
        session {
          sub
          givenName
          familyName
          email
          ...defaultLayout_session
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
    const {userBySub, sub, givenName, familyName, email} = session || {};

    return (
      <DefaultLayout title="Registration" session={session} needsUser={false}>
        <h4 className="mb-5">Please verify or update your information</h4>
        <UserForm
          user={userBySub}
          uuid={sub as string}
          defaultGivenName={givenName}
          defaultFamilyName={familyName}
          defaultEmail={email}
          onSubmit={async () =>
            router.push(
              decodeURI(router.query.redirectTo as string) || '/user-dashboard'
            )
          }
        />
      </DefaultLayout>
    );
  }
}

export default Registration;
