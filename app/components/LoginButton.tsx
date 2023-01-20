import React from "react";
import { useRouter } from "next/router";
import { Form } from "react-bootstrap";

interface Props {
  idpHint: "idir" | "bceidboth";
}

const LoginForm: React.FunctionComponent<Props> = ({ children, idpHint }) => {
  const router = useRouter();
  let loginURI = `/login?kc_idp_hint=${idpHint}`;

  if (router.query.redirectTo)
    loginURI += `&redirectTo=${encodeURIComponent(
      router.query.redirectTo as string
    )}`;

  return (
    <Form action={loginURI} method="post">
      {children}
    </Form>
  );
};

export default LoginForm;
