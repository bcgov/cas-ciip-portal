import {UrlObject} from 'url';
import Router, {Router as RouterType} from 'next/router';
import {action} from '@storybook/addon-actions';

declare type Url = string | UrlObject;

const router: RouterType = {
  ...Router.router,
  replace: async (url: Url, as?: Url, options?: {}): Promise<boolean> => {
    action('Router#replace')(url, as, options);
    return true;
  },
  push: async (url: Url, as?: Url, options?: {}): Promise<boolean> => {
    action('Router#push')(url, as, options);
    return true;
  },
  prefetch: async (url: Url, as?: Url, options?: {}): Promise<void> => {
    action('Router#prefetch')(url, as, options);
  }
};

// Monkeypatch the router instance
Router._router = Router.router;
Router.router = router;

export {Router};
