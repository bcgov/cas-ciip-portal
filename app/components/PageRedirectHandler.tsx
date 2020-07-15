import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {fetchQuery, graphql} from 'relay-runtime';
import LoadingSpinner from 'components/LoadingSpinner';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import {CiipPageComponent} from 'next-env';
import {getUserGroupLandingRoute} from 'lib/user-groups';
import {PageRedirectHandlerQuery} from '__generated__/PageRedirectHandlerQuery.graphql';

interface Props {
  environment: RelayModernEnvironment;
  pageComponent: CiipPageComponent;
}

const PageRedirectHandler: React.FunctionComponent<Props> = ({
  children,
  environment,
  pageComponent
}) => {
  const sessionQuery = graphql`
    query PageRedirectHandlerQuery {
      session {
        userGroups
        ciipUserBySub {
          __typename
        }
      }
    }
  `;

  const [shouldRender, setShouldRender] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!shouldRender) {
      checkSessionAndGroups();
    }
  });

  const checkSessionAndGroups = async () => {
    const {isAccessProtected, allowedGroups = []} = pageComponent;
    const response = await fetchQuery<PageRedirectHandlerQuery>(
      environment,
      sessionQuery,
      {}
    );
    if (isAccessProtected && !response?.session) {
      router.push({
        pathname: '/login-redirect',
        query: {
          redirectTo: router.asPath
        }
      });
      return null;
    }

    const userGroups = response?.session?.userGroups || ['Guest'];

    const canAccess =
      allowedGroups.length === 0 ||
      userGroups.some((g) => allowedGroups.includes(g));

    // Redirect users attempting to access a page that their group doesn't allow
    // to their landing route. This needs to happen before redirecting to the registration
    // to ensure that a pending analyst doesn't get redirect to the registration page
    if (!canAccess) {
      router.push({
        pathname: getUserGroupLandingRoute(userGroups)
      });
      return null;
    }

    if (isAccessProtected && !response?.session?.ciipUserBySub) {
      router.push({
        pathname: '/registration',
        query: {
          redirectTo: router.asPath
        }
      });
      return null;
    }

    setShouldRender(true);
  };

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (shouldRender) return <>{children}</>;

  return (
    <div>
      <LoadingSpinner />
      <style jsx>{`
        div {
          height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default PageRedirectHandler;
