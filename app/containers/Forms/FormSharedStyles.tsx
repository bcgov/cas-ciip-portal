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
  .form-submit {
    border: 1px solid #bbb;
    padding: 30px;
    background: #e0e0e0;
    border-radius: 6px;
  }
  .errors {
    margin-left: 20px;
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
    background: white !important;
    color: #003366;
    margin-left: 5px;
  }
`;
