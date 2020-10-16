import css from 'styled-jsx/css';

export default css.global`
  .rjsf .form-row {
    margin: 20px 0 20px;
  }
  .emission-form .rjsf .form-row {
    margin: 0;
  }
  .no-col-padding .form-row > .col,
  .no-col-padding .form-row > [class*='col-'] {
    padding: 0;
  }
  .errors {
    margin: 1em 0 0 0;
    padding: 20px;
    background: #ce5c5c;
    color: white;
    font-size: 20px;
  }
  ul.error-detail {
    padding: 0;
    list-style: none;
  }
  ul.error-detail li.text-danger {
    background: #ce5c5c;
    color: white !important;
    padding: 5px;
  }
  .exit-button {
    color: #003366;
    margin-left: 5px;
    border-color: #003366;
  }
  .exit-button:hover {
    color: white !important;
    background: #007bff !important;
  }
`;
