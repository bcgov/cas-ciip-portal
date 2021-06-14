import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {graphql, createFragmentContainer} from 'react-relay';
import {defaultLayout_session} from '__generated__/defaultLayout_session.graphql';
import getConfig from 'next/config';
import Header from 'components/Layout/Header';
import UserProfileDropdown from 'containers/User/UserProfileDropdown';
import Footer from 'components/Layout/Footer';
import Subheader from 'components/Layout/Subheader';
import Help from 'components/helpers/Help';
import SiteNoticeBanner from 'components/Layout/SiteNoticeBanner';
import CookieDayPickerInput from 'components/helpers/CookieDayPickerInput';
import HelpButton from 'components/helpers/HelpButton';
import {ADMIN_GROUP, INCENTIVE_ANALYST} from 'data/group-constants';

const runtimeConfig = getConfig()?.publicRuntimeConfig ?? {};

interface Props {
  title?: string | JSX.Element;
  titleControls?: JSX.Element;
  showSubheader?: boolean;
  session: defaultLayout_session;
  width?: 'narrow' | 'wide';
  fixedHeader?: boolean;
  help?: {
    title: string;
    helpMessage: string;
  };
  disableHelpButton?: boolean;
}

const DefaultLayout: React.FunctionComponent<Props> = ({
  children,
  title,
  titleControls,
  showSubheader,
  fixedHeader = false,
  session,
  width = 'narrow',
  help,
  disableHelpButton = false
}) => {
  const isInternalUser = [INCENTIVE_ANALYST, ...ADMIN_GROUP].some((role) => {
    return session?.userGroups.includes(role);
  });

  return (
    <div id="page-wrap" className={`${fixedHeader ? 'has-fixed-header' : ''}`}>
      <Header
        fixed={fixedHeader}
        isLoggedIn={Boolean(session)}
        isRegistered={Boolean(session?.ciipUserBySub)}
        userProfileDropdown={
          <UserProfileDropdown user={session ? session.ciipUserBySub : null} />
        }
      >
        {runtimeConfig.SITEWIDE_NOTICE && (
          <SiteNoticeBanner content={runtimeConfig.SITEWIDE_NOTICE} />
        )}
        {showSubheader && <Subheader />}
      </Header>
      <main>
        {title || titleControls ? (
          <div id="page-title">
            <Container className={width}>
              <Row>
                {title && (
                  <Col>
                    <div id="title-container">
                      <h1>{title}</h1>
                      {help && (
                        <Help
                          title={help.title}
                          helpMessage={help.helpMessage}
                        />
                      )}
                    </div>
                  </Col>
                )}
                <Col sm="auto">{titleControls}</Col>
              </Row>
            </Container>
          </div>
        ) : null}

        <div id="page-content" className={`container ${width}`}>
          {children}
        </div>
        {Boolean(session) && !disableHelpButton && (
          <HelpButton isInternalUser={isInternalUser} />
        )}
      </main>
      <Footer>
        {runtimeConfig.ENABLE_DB_MOCKS === 'true' && <CookieDayPickerInput />}
      </Footer>
      <style jsx>
        {`
          #page-wrap {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          main {
            flex-grow: 1;
          }
          #page-wrap.has-fixed-header main {
            padding-top: 68px;
          }
          #page-content {
            padding-top: 50px;
            flex: 1 0 auto;
          }
          @media screen and (min-width: 992px) {
            #page-content {
              padding-top: 60px;
            }
          }
          #page-title {
            background: #f5f5f5;
            border-bottom: 1px solid #ccc;
            padding: 30px 0 30px;
          }
          #page-title h1 {
            font-size: 25px;
            font-weight: 400;
          }
          #title-container {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        `}
      </style>
      <style jsx global>
        {`
          a {
            color: #0053b3;
          }
          .btn-link {
            color: #0053b3;
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
          button.full-width {
            width: 100%;
          }
          .btn-primary {
            background: #036;
            border-color: #036;
          }
          .accordion .card-body {
            font-size: 15px;
          }
          .container.wide {
            max-width: 1600px;
          }

          /* BS overrides for purposes of accessibility: */

          .btn-outline-primary {
            color: #0053b3;
            border-color: #0053b3;
          }
          .badge-success,
          .btn-success {
            background-color: #24883e;
          }
          .badge-info,
          .btn-info {
            background-color: #197ea3;
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
        ...UserProfileDropdown_user
      }
      userGroups
    }
  `
});
