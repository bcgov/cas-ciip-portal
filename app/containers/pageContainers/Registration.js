import React, {Component} from 'react';
import {graphql} from 'react-relay';
import FormUpdateUser from '../Forms/FormUpdateUser';
import FormCreateUser from '../Forms/FormCreateUser';
import DefaultLayout from '../../layouts/default-layout';

class Registration extends Component {
  static query = graphql`
    query RegistrationQuery {
      query {
        user(id: "WyJ1c2VycyIsMV0=") {
          ...FormUpdateUser_user
        }
      }
    }
  `;

  render() {
    const {user} = this.props.query;

    if (user === null) {
      return (
        <>
          <DefaultLayout title="New User Registration">
            <h4 className="mb-5">Please enter your information</h4>
            <FormCreateUser />
          </DefaultLayout>
        </>
      );
    }

    return (
      <>
        <DefaultLayout title="Registration">
          <h4 className="mb-5">Please verify or update your information</h4>
          <FormUpdateUser user={user} />
        </DefaultLayout>
      </>
    );
  }
}

export default Registration;
