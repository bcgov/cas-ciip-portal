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

  const [showModal, setShowModal] = useState(false);

  // UNIX timestamp (ms)
  const [sessionExpiresOn, setSessionExpiresOn] = useState(Infinity);

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
    const response = await fetch('/extend-session');
    if (response.ok) {
      const timeout = Number(await response.json());
      if (timeout > MODAL_DISPLAY_THRESHOLD_SECONDS) {
        setShowModal(false);
      }
      setSessionExpiresOn(timeout * 1000 + Date.now());
    }
  };

  useEffect(() => {
    let timeoutId;

    const checkSessionIdle = async () => {
      if (!pageComponent.isAccessProtected) return;

      const response = await fetch('/session-idle-remaining-time');
      if (response.ok) {
        const timeout = Number(await response.json());

        setSessionExpiresOn(Date.now() + timeout * 1000);

        if (timeout > MODAL_DISPLAY_THRESHOLD_SECONDS) {
          setShowModal(false);
          timeoutId = setTimeout(() => {
            checkSessionIdle();
          }, (timeout - MODAL_DISPLAY_THRESHOLD_SECONDS) * 1000);
        } else if (timeout > 0) {
          setShowModal(true);
          timeoutId = setTimeout(() => {
            checkSessionIdle();
          }, timeout * 1000);
        } else {
          logoutOnSessionIdled();
        }
      }
    };

    checkSessionIdle();

    // Return cleanup function
    return () => {
      clearTimeout(timeoutId);
    };
  }, [router, pageComponent]);

  return (
    showModal && (
      <LogoutWarningModal
        inactivityDelaySeconds={MODAL_DISPLAY_THRESHOLD_SECONDS}
        expiresOn={sessionExpiresOn}
        onExtendSession={() => {
          extendSession();
        }}
      />
    )
  );
};

export default SessionTimeoutHandler;
