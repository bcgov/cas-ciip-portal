import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LogoutWarningModal from "./LogoutWarningModal";
import throttle from "lodash.throttle";

// Delay to avoid race condition with the server. On session expiry, we wait
// an additional delay to make sure the session is expired.
const SERVER_DELAY_SECONDS = 1;
interface Props {
  modalDisplaySecondsBeforeLogout: number;
}

const SessionTimeoutHandler: React.FunctionComponent<Props> = ({
  modalDisplaySecondsBeforeLogout,
}) => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  // seconds from Date.now()
  const [sessionTimeout, setSessionTimeout] = useState(Infinity);

  const logoutOnSessionIdled = () => {
    router.push({
      pathname: "/login-redirect",
      query: {
        redirectTo: router.asPath,
        sessionIdled: true,
      },
    });
  };

  const fetchSessionTimeout = async () => {
    const response = await fetch("/session-idle-remaining-time");
    if (response.ok) {
      const timeout = Number(await response.json());
      if (timeout > modalDisplaySecondsBeforeLogout) {
        setShowModal(false);
      }
      setSessionTimeout(timeout);
    } else {
      logoutOnSessionIdled();
    }
  };

  // Effect polling the session remaining time on mount,
  // then throttling the session refresh every 5 minutes.
  useEffect(() => {
    const throttleTime = 1000 * 60 * 5; // 5 minutes
    const events = ["keydown", "mousedown", "scroll"];

    // Execute callback on component mount
    fetchSessionTimeout();

    const throttledSession = throttle(fetchSessionTimeout, throttleTime, {
      leading: false,
      trailing: true,
    });

    events.forEach((event) => {
      window.addEventListener(event, throttledSession);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, throttledSession);
      });
      throttledSession.cancel();
    };
  }, [router]);

  // Effect adjustting the timing of the session expiry modal display, whenever the session
  // timeout is updated.
  useEffect(() => {
    let modalTimeoutId;
    let sessionTimeoutId;

    const checkSessionIdle = () => {
      const timeout = sessionTimeout;

      if (timeout > 0) {
        if (timeout > modalDisplaySecondsBeforeLogout) {
          setShowModal(false);
          modalTimeoutId = setTimeout(() => {
            setShowModal(true);
          }, (timeout + SERVER_DELAY_SECONDS - modalDisplaySecondsBeforeLogout) * 1000);
        } else {
          setShowModal(true);
        }

        // If the user has not extended their session by then we will redirect them (by invoking logoutOnSessionIdled() below)
        // If they do extend their session (or have in a different tab), the `checkSessionIdle()` call will branch into the first condition above, hide the modal,
        // and set another timeout to check the session idle when the modal is due to be displayed.

        sessionTimeoutId = setTimeout(() => {
          fetchSessionTimeout();
        }, (timeout + SERVER_DELAY_SECONDS) * 1000);
      } else {
        logoutOnSessionIdled();
      }
    };

    checkSessionIdle();

    // Return cleanup function
    return () => {
      clearTimeout(sessionTimeoutId);
      clearTimeout(modalTimeoutId);
    };
  }, [sessionTimeout]);

  return (
    showModal && (
      <LogoutWarningModal
        inactivityDelaySeconds={modalDisplaySecondsBeforeLogout}
        expiresOn={sessionTimeout * 1000 + Date.now()}
        onExtendSession={fetchSessionTimeout}
      />
    )
  );
};

export default SessionTimeoutHandler;
