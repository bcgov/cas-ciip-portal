import React, {PureComponent} from 'react';
import propTypes from 'prop-types';

class FormLoader extends PureComponent {
  static propTypes = {
    formJson: propTypes.object.isRequired
  };

  render() {
    return <>{this.props.formJson}</>;
  }
}

export default FormLoader;
