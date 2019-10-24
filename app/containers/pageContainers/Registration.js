import React, {Component} from 'react';
import {graphql} from 'react-relay';
import FormCreateUser from '../Forms/FormCreateUser';
import DefaultLayout from '../../layouts/default-layout';

class Registration extends Component {
  static query = graphql`
    query RegistrationQuery {
      query {
        user(id: "WyJ1c2VycyIsMV0=") {
          ...FormCreateUser_user
        }
      }
    }
  `;

  render() {
    const {user} = this.props.query;

    return (
      <>
        <DefaultLayout title="Registration">
          <FormCreateUser user={user} />
        </DefaultLayout>
      </>
    );
  }
}

export default Registration;
