import React, {useEffect} from 'react';
import throttle from 'lodash.throttle';

interface Props {
  refreshUrl: string;
}

const SessionRefresher: React.FunctionComponent<Props> = ({refreshUrl}) => {
  const extendSession = async () => {
    try {
      await fetch(refreshUrl);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log('refresher mounted');
    const throttledSession = throttle(extendSession, 1000 * 60); // bump session each minute.
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
