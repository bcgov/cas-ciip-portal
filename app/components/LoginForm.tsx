import React from 'react';
import {useRouter} from 'next/router';
import {Form} from 'react-bootstrap';

const LoginForm = ({children}) => {
  const router = useRouter();

  return (
    <Form action="/login" method="post">
      <input
        hidden
        readOnly
        name="redirectTo"
        value={
          decodeURI(router.query.redirectTo as string) || '/user-dashboard'
        }
      />
      {children}
    </Form>
  );
};

export default LoginForm;
