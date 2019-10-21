import React, {Component} from 'react';
import FormCreateUser from '../Forms/FormCreateUser';
import DefaultLayout from '../../layouts/default-layout';

class Registration extends Component {
  render() {
    return (
      <>
        <DefaultLayout title="Registration">
          <FormCreateUser />
        </DefaultLayout>
      </>
    );
  }
}

export default Registration;
