import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {registrationQueryResponse} from 'registrationQuery.graphql';
import {CiipPageComponentProps} from 'next-env';
import UserForm from 'containers/User/UserForm';
import DefaultLayout from 'layouts/default-layout';
import {INCENTIVE_ANALYST, ADMIN_GROUP, USER} from 'data/group-constants';

interface Props extends CiipPageComponentProps {
  query: registrationQueryResponse['query'];
}

class Registration extends Component<Props> {
  /**
   * The registration page should not be opened to the PENDING_ANALYST group,
   * i.e. users who logged in with their IDIR,
   * but who have not been added to the right group by a keycloak realm admin
   */
  static allowedGroups = [INCENTIVE_ANALYST, ...ADMIN_GROUP, USER];
  static isAccessProtected = true;
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
      <DefaultLayout title="Registration" session={session}>
        <h4 className="mb-5">Please verify or update your information</h4>
        <div className="registration-form">
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
                  : '/reporter'
              )
            }
          />
        </div>
        <style jsx>{`
          .registration-form {
            max-width: 800px;
          }
        `}</style>
      </DefaultLayout>
    );
  }
}

export default Registration;
