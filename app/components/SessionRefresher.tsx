import React, {useEffect} from 'react';
import throttle from 'lodash.throttle';

interface Props {
  refreshUrl: string;
}

export const THROTTLED_TIME = 1000 * 60;

const SessionRefresher: React.FunctionComponent<Props> = ({refreshUrl}) => {
  const extendSession = async () => {
    try {
      await fetch(refreshUrl);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const throttledSession = throttle(extendSession, THROTTLED_TIME, {
      leading: false,
      trailing: true
    }); // bump session each minute.
    window.addEventListener('keydown', throttledSession);
    window.addEventListener('mousedown', throttledSession);
    window.addEventListener('scroll', throttledSession);

    return () => {
      window.removeEventListener('keydown', throttledSession);
      window.removeEventListener('mousedown', throttledSession);
      window.removeEventListener('scroll', throttledSession);
      throttledSession.cancel();
    };
  }, []);

  return null;
};

export default SessionRefresher;
