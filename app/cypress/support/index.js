import './commands';
import 'cypress-axe';
// eslint-disable-next-line import/no-unresolved
import authenticatedPages from './authenticatedPages.json';

const EXCLUDED_SELECTORS = [['.rbt-input-hint']];

function excludeA11y(axeRun) {
  return function customAxeRun(ctx, ...args) {
    const runCtx = {exclude: EXCLUDED_SELECTORS};

    if (ctx === undefined || ctx === null) {
      axeRun(runCtx);
      return;
    }

    if (typeof ctx === 'string') {
      runCtx.include = [[ctx]];
    } else if (ctx instanceof HTMLElement || ctx instanceof NodeList) {
      runCtx.include = ctx;
    } else {
      if (ctx.include !== undefined) {
        runCtx.include = ctx.include;
      }
      runCtx.exclude = [...ctx.exclude, ...runCtx.exclude];
    }
    axeRun(runCtx, ...args);
  };
}

cy.checkA11y = excludeA11y(cy.checkA11y);

Cypress.env.AUTHENTICATED_PAGES = authenticatedPages;
