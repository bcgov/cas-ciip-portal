import {UrlObject} from 'url';
import Router, {Router as RouterType} from 'next/router';
import {action} from '@storybook/addon-actions';

declare type Url = string | UrlObject;

/* eslint-disable @typescript-eslint/consistent-type-assertions */
Router.router = {
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
} as RouterType;
/* eslint-enable @typescript-eslint/consistent-type-assertions */

export {Router};
