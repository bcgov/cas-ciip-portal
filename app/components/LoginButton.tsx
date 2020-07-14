import React from 'react';
import {useRouter} from 'next/router';
import {Form} from 'react-bootstrap';

const LoginForm: React.FunctionComponent = ({children}) => {
  const router = useRouter();
  let loginURI = '/login';

  if (router.query.redirectTo)
    loginURI += `?redirectTo=${encodeURIComponent(
      router.query.redirectTo as string
    )}`;

  return (
    <Form action={loginURI} method="post">
      {children}
    </Form>
  );
};

export default LoginForm;
