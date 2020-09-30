import './commands';
import 'cypress-axe';
import 'cypress-plugin-retries';
import authenticatedPages from './authenticatedPages.json';

Cypress.env.AUTHENTICATED_PAGES = authenticatedPages;
