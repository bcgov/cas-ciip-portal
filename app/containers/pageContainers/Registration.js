import React, {Component} from 'react';
import {graphql} from 'react-relay';
import FormEditUser from '../Forms/FormEditUser';
import DefaultLayout from '../../layouts/default-layout';

class Registration extends Component {
  static query = graphql`
    query RegistrationQuery {
      query {
        user(id: "WyJ1c2VycyIsMV0=") {
          ...FormEditUser_user
        }
      }
    }
  `;

  render() {
    const {user} = this.props.query;

    return (
      <DefaultLayout title="Registration">
        <h4 className="mb-5">Please verify or update your information</h4>
        <FormEditUser user={user} />
      </DefaultLayout>
    );
  }
}

export default Registration;
