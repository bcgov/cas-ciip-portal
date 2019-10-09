import React from 'react';
import {Dropdown} from 'react-bootstrap';

const DropdownMenuItemComponent = props => {
  const {itemId, itemEventKey, itemFunc, itemTitle} = props;
  return (
    <Dropdown.Item
      style={{textTransform: 'capitalize'}}
      id={itemId}
      eventKey={itemEventKey}
      onSelect={itemFunc}
    >
      {itemTitle}
    </Dropdown.Item>
  );
};

export default DropdownMenuItemComponent;
