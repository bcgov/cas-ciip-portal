import React, {PureComponent} from 'react';
import propTypes from 'prop-types';

class FormLoader extends PureComponent {
  static propTypes = {
    formJson: propTypes.object.isRequired
  };

  render() {
    return (
      <>
        <div id="surveyContainer">
          {this.props.formJson}
          <style jsx global>
            {`
              #surveyContainer {
                border: 1px solid #dcdcdcf2;
                border-radius: 4px;
                box-shadow: 0px 7px 9px 0px #00000026;
                padding: 20px;
              }
              .card-footer :global {
                background: white !important;
                display: none;
              }
              .sv_container .panel-footer {
                background: white;
                text-align: right;
              }
              .sv_container .panel-footer .btn.sv_complete_btn {
                background: #036;
                color: white;
              }
            `}
          </style>
        </div>
      </>
    );
  }
}

export default FormLoader;
