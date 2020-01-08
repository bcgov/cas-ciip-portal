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
          ciipUserBySub {
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
    const {ciipUserBySub, sub, givenName, familyName, email} = session || {};

    return (
      <DefaultLayout title="Registration" session={session} needsUser={false}>
        <h4 className="mb-5">Please verify or update your information</h4>
        <UserForm
          user={ciipUserBySub}
          uuid={sub as string}
          defaultGivenName={givenName}
          defaultFamilyName={familyName}
          defaultEmail={email}
          onSubmit={async () =>
            router.push(
              router.query.redirectTo
                ? (router.query.redirectTo as string)
                : '/reporter/user-dashboard'
            )
          }
        />
      </DefaultLayout>
    );
  }
}

export default Registration;
