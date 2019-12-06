import Router from 'next/router';
import {action} from '@storybook/addon-actions';

Router.router = {
  push: action('Router#push'),
  prefetch: action('Router#prefetch')
};
