import React from 'react';
import {useRouter} from 'next/router';
import {Form} from 'react-bootstrap';

const LoginForm = ({children}) => {
  const router = useRouter();

  return (
    <Form
      action={`/login?redirectTo=${decodeURI(router.query
        .redirectTo as string) || '/user-dashboard'}`}
      method="post"
    >
      {children}
    </Form>
  );
};

export default LoginForm;
