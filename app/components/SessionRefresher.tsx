import React, {useEffect} from 'react';
import throttle from 'lodash.throttle';

interface Props {
  refreshUrl: string;
  throttledTime: number;
}

const SessionRefresher: React.FunctionComponent<Props> = ({
  refreshUrl,
  throttledTime = 1000 * 60
}) => {
  const extendSession = async () => {
    try {
      await fetch(refreshUrl);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const throttledSession = throttle(extendSession, throttledTime, {
      leading: false,
      trailing: true
    });
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
