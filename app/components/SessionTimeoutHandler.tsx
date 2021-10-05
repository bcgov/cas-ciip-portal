import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import LogoutWarningModal from './LogoutWarningModal';

interface Props {
  modalDisplaySecondsBeforeLogout: number;
}

const SessionTimeoutHandler: React.FunctionComponent<Props> = ({
  modalDisplaySecondsBeforeLogout
}) => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  // UNIX epoch (ms)
  const [sessionExpiresOn, setSessionExpiresOn] = useState(Infinity);

  const logoutOnSessionIdled = () => {
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
      if (timeout > modalDisplaySecondsBeforeLogout) {
        setShowModal(false);
      }
      setSessionExpiresOn(timeout * 1000 + Date.now());
    }
  };

  useEffect(() => {
    let timeoutId;

    const checkSessionIdle = async () => {
      const response = await fetch('/session-idle-remaining-time');
      if (response.ok) {
        const timeout = Number(await response.json());

        setSessionExpiresOn(Date.now() + timeout * 1000);

        if (timeout > modalDisplaySecondsBeforeLogout) {
          setShowModal(false);
          timeoutId = setTimeout(() => {
            checkSessionIdle();
          }, (timeout - modalDisplaySecondsBeforeLogout) * 1000);
        } else if (timeout > 0) {
          // We display the modal and set a timeout to check again when the session is due to expire according to the server.
          // If the user has not extended their session by then we will redirect them (by invoking logoutOnSessionIdled() below)
          // If they do extend their session (or have in a different tab), the `checkSessionIdle()` call will branch into the first condition above, hide the modal,
          // and set another timeout to check the session idle when the modal is due to be displayed.

          setShowModal(true);
          timeoutId = setTimeout(() => {
            checkSessionIdle();
          }, timeout * 1000);
        } else {
          logoutOnSessionIdled();
        }
      } else {
        // if the response is not OK (i.e. 500)
        logoutOnSessionIdled();
      }
    };

    checkSessionIdle();

    // Return cleanup function
    return () => {
      clearTimeout(timeoutId);
    };
  }, [router]);

  return (
    showModal && (
      <LogoutWarningModal
        inactivityDelaySeconds={modalDisplaySecondsBeforeLogout}
        expiresOn={sessionExpiresOn}
        onExtendSession={extendSession}
      />
    )
  );
};

export default SessionTimeoutHandler;
