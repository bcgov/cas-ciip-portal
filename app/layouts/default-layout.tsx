import React from 'react';
import {Container} from 'react-bootstrap';
import {graphql, createFragmentContainer} from 'react-relay';
import {defaultLayout_session} from '__generated__/defaultLayout_session.graphql';
import getConfig from 'next/config';
import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';
import Subheader from 'components/Layout/Subheader';
import Help from 'components/helpers/Help';
import SiteNoticeBanner from 'components/Layout/SiteNoticeBanner';

const SITEWIDE_NOTICE = getConfig()?.publicRuntimeConfig.SITEWIDE_NOTICE;

interface Props {
  title?: string | JSX.Element;
  showSubheader?: boolean;
  session: defaultLayout_session;
  width?: 'narrow' | 'wide';
  help?: {
    title: string;
    helpMessage: string;
  };
}

const DefaultLayout: React.FunctionComponent<Props> = ({
  children,
  title,
  showSubheader,
  session,
  width = 'narrow',
  help
}) => {
  return (
    <div className="page-wrap">
      <Header
        isLoggedIn={Boolean(session)}
        isRegistered={Boolean(session?.ciipUserBySub)}
      />
      {SITEWIDE_NOTICE && <SiteNoticeBanner content={SITEWIDE_NOTICE} />}
      {showSubheader && <Subheader />}
      {title ? (
        <div className="page-title" role="region" aria-label="page title">
          <Container className={width}>
            <h1>{title}</h1>
            {help && <Help title={help.title} helpMessage={help.helpMessage} />}
          </Container>
        </div>
      ) : null}
      <div role="main">
        <Container id="page-content" className={`content ${width}`}>
          {children}
        </Container>
      </div>
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
            display: inline-block;
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
          .accordion .card-body {
            font-size: 15px;
          }
          .container.wide {
            max-width: 1600px;
          }

          @media screen and (min-width: 992px) {
            #page-content {
              padding-top: 110px;
            }
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
      ciipUserBySub {
        __typename
      }
    }
  `
});
