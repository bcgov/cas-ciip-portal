import React from 'react';
import {useRouter} from 'next/router';
import {Form, Button, ButtonProps} from 'react-bootstrap';

const LoginForm: React.FunctionComponent<React.ComponentPropsWithoutRef<
  'button'
> &
  ButtonProps> = props => {
  const router = useRouter();
  let loginURI = '/login';

  if (router.query.redirectTo)
    loginURI += `?redirectTo=${router.query.redirectTo as string}`;

  return (
    <Form action={loginURI} method="post">
      <Button {...props} type="submit" />
    </Form>
  );
};

export default LoginForm;
