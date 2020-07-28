import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';

const SupportedBrowserNotice = () => {
  const [showBrowserNotice, setShowBrowserNotice] = useState(true);

  return (
    showBrowserNotice &&
    <Alert variant="warning" dismissible onClose={() => setShowBrowserNotice(false)}>
      <strong>Note:</strong> For best results, use an updated version of <Alert.Link href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer">Chrome</Alert.Link>, <Alert.Link href="https://www.mozilla.org/firefox/new" target="_blank" rel="noopener noreferrer">Firefox</Alert.Link>, <Alert.Link href="https://www.microsoft.com/edge" target="_blank" rel="noopener noreferrer">Edge</Alert.Link> or <Alert.Link href="https://support.apple.com/en-us/HT204416" target="_blank" rel="noopener noreferrer">Safari</Alert.Link>.
    </Alert>
  );
};

export default SupportedBrowserNotice;