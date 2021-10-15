import css from "styled-jsx/css";

export default css`
  :global(.modal-header h2) {
    margin-bottom: 0;
  }
  :global(.modal-header) {
    background: #036;
    color: #fff;
  }
  :global(.modal-header button.close) {
    color: #fff;
  }
  :global(.modal-body) {
    padding: 2rem;
  }
  :global(.modal-body > :last-child) {
    margin-bottom: 0;
  }
`;
