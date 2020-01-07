import {UrlObject} from 'url';
import Router, {Router as RouterType} from 'next/router';
import {action} from '@storybook/addon-actions';

declare type Url = string | UrlObject;

const router: Partial<RouterType> = Router.router ? {...Router.router} : {};

router.replace = async (url: Url, as?: Url, options?: {}): Promise<boolean> => {
  action('Router#replace')(url, as, options);
  return true;
};

router.push = async (url: Url, as?: Url, options?: {}): Promise<boolean> => {
  action('Router#push')(url, as, options);
  return true;
};

router.prefetch = async (url: Url, as?: Url, options?: {}): Promise<void> => {
  action('Router#prefetch')(url, as, options);
};

router.pageLoader = {prefetched: {}};

Router.router = router as RouterType;

export {Router};
