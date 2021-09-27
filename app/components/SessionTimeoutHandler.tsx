import {CiipPageComponent} from 'next-env';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import LogoutWarningModal from './LogoutWarningModal';

interface Props {
  pageComponent: CiipPageComponent;
}

const MODAL_DISPLAY_THRESHOLD_SECONDS = 1785;

const SessionTimeoutHandler: React.FunctionComponent<Props> = ({
  pageComponent
}) => {
  const router = useRouter();

  const [remainingSeconds, setRemainingSeconds] = useState(9999);
  const [sessionDueForRefresh, setSessionDueForRefresh] = useState({
    isDue: false
  });

  const logoutOnSessionIdled = async () => {
    router.push({
      pathname: '/login-redirect',
      query: {
        redirectTo: router.asPath,
        sessionIdled: true
      }
    });
  };

  const extendSession = async () => {
    await fetch('/extend-session');
    setSessionDueForRefresh({isDue: true});
  };

  useEffect(() => {
    let timeoutId;
    let localRemainingSeconds = 0;

    const checkSessionIdle = async () => {
      if (!pageComponent.isAccessProtected) return;

      if (localRemainingSeconds === 0) {
        const response = await fetch('/session-idle-remaining-time');
        if (response.ok) {
          const timeout = Number(await response.json());
          if (timeout > 0) {
            localRemainingSeconds = timeout;
            timeoutId = setTimeout(() => {
              localRemainingSeconds -= 1;
              setRemainingSeconds(localRemainingSeconds);
              checkSessionIdle();
            }, 1000);
          } else {
            logoutOnSessionIdled();
          }
        }
      } else {
        timeoutId = setTimeout(() => {
          localRemainingSeconds -= 1;
          setRemainingSeconds(localRemainingSeconds);
          checkSessionIdle();
        }, 1000);
      }
    };

    checkSessionIdle();

    // Return cleanup function
    return () => {
      clearTimeout(timeoutId);
    };
  }, [router, pageComponent, sessionDueForRefresh]);

  return pageComponent.isAccessProtected &&
    remainingSeconds < MODAL_DISPLAY_THRESHOLD_SECONDS ? (
    <LogoutWarningModal
      inactivityDelaySeconds={MODAL_DISPLAY_THRESHOLD_SECONDS}
      remainingSeconds={remainingSeconds}
      onExtendSession={() => {
        extendSession();
      }}
    />
  ) : null;
};

export default SessionTimeoutHandler;
