import React from 'react';
import {Container} from 'react-bootstrap';
import {graphql, createFragmentContainer} from 'react-relay';
import {defaultLayout_session} from '__generated__/defaultLayout_session.graphql';
import {useRouter} from 'next/router';
import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';
import Subheader from 'components/Layout/Subheader';

interface Props {
  title?: string | JSX.Element;
  showSubheader?: boolean;
  session: defaultLayout_session;
  needsUser?: boolean;
  needsSession?: boolean;
  width?: 'narrow' | 'wide';
}

const DefaultLayout: React.FunctionComponent<Props> = ({
  children,
  title,
  showSubheader,
  session,
  width = 'narrow',
  needsUser = true,
  needsSession = true
}) => {
  const router = useRouter();

  console.log(session);

  if ((needsSession || needsUser) && !session) {
    router.push({
      pathname: '/login-redirect',
      query: {
        redirectTo: router.asPath
      }
    });
    return null;
  }

  if (needsUser && !session.ciipUserBySub) {
    router.push({
      pathname: '/registration',
      query: {
        redirectTo: router.asPath
      }
    });
    return null;
  }

  return (
    <div className="page-wrap">
      <Header
        isLoggedIn={Boolean(session)}
        isRegistered={Boolean(session && session.ciipUserBySub)}
      />
      {showSubheader && <Subheader />}
      {title ? (
        <div className="page-title">
          <Container className={width}>
            <h1>{title}</h1>
          </Container>
        </div>
      ) : null}
      <Container className={`content ${width}`}>{children}</Container>
      <Footer />
      <style jsx global>
        {`
          html,
          body,
          #__next,
          .page-wrap {
            height: 100%;
          }
          .page-wrap {
            display: flex;
            flex-direction: column;
          }
          .content {
            padding-top: 50px;
            flex: 1 0 auto;
          }
          .footer {
            flex-shrink: 0;
          }
          h1 {
            font-size: 30px;
          }
          .page-title {
            background: #f5f5f5;
            border-bottom: 1px solid #ccc;
            padding: 40px 0 20px;
          }
          .page-title h1 {
            font-size: 25px;
            font-weight: 400;
          }
          h3 {
            margin-bottom: 20px;
            font-weight: 500;
          }
          .blue {
            color: #036;
          }
          p {
            line-height: 25px;
          }
          .ciip-card {
            border: 1px solid #036;
            padding: 15px;
            border-radius: 0;
            box-shadow: 1px 8px 13px -5px #00336694;
          }
          button.full-width {
            width: 100%;
          }
          .btn-primary {
            background: #036;
            border-color: #036;
          }
          .with-shadow {
            box-shadow: 1px 8px 13px -5px #00336694;
          }
          .accordion button {
            text-align: left;
            padding-left: 0;
            color: #1a5a96;
          }
          .accordion .card-body {
            font-size: 15px;
          }
          .container.wide {
            max-width: 1600px;
          }
        `}
      </style>
    </div>
  );
};

export {DefaultLayout as DefaultLayoutComponent};
export default createFragmentContainer(DefaultLayout, {
  session: graphql`
    fragment defaultLayout_session on JwtToken {
      userGroups
      ciipUserBySub {
        __typename
      }
    }
  `
});
