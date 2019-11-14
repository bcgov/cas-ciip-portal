import React from 'react';
import {Container, Dropdown, Button, Row, Col, Form} from 'react-bootstrap';
import DropdownMenuItemComponent from './DropdownMenuItemComponent';

interface Props {
  orderByDisplay: string;
  direction: string;
  searchDisplay: string;
  handleEvent: (...args: any[]) => void;
  dropdownSortItems: any[];
}
export const SearchTableLayoutComponent: React.FunctionComponent<
  Props
> = props => {
  const {
    orderByDisplay,
    searchDisplay,
    direction,
    handleEvent,
    dropdownSortItems
  } = props;

  return (
    <>
      <Container style={{padding: 20, background: '#dee2e6'}}>
        <Row>
          <Col md={3}>
            <h5>Sort</h5>
          </Col>
          <Col md={1} />
          <Col md={3}>
            <h5>Filter</h5>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <Dropdown style={{width: '100%'}}>
              <Dropdown.Toggle
                style={{width: '100%', backgroundColor: '#036'}}
                id="dropdown-sort"
              >
                {orderByDisplay}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{width: '100%'}}>
                {dropdownSortItems.map(item => (
                  <DropdownMenuItemComponent
                    key={item.eventKey}
                    itemId="sortApplications"
                    itemEventKey={item.eventKey}
                    itemFunc={(eventKey, event) => handleEvent(event, eventKey)}
                    itemTitle={item.title}
                  />
                ))}
                ;
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={1}>
            <Button
              id="toggleDirection"
              style={{width: '100%', backgroundColor: '#036'}}
              onClick={event => handleEvent(event)}
            >
              {direction}
            </Button>
          </Col>
          <Col md={1} />
          <Col md={2}>
            <Dropdown style={{width: '100%'}}>
              <Dropdown.Toggle
                style={{width: '100%', backgroundColor: '#036'}}
                id="dropdown-filter"
              >
                {searchDisplay}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{width: '100%'}}>
                {[
                  {eventKey: null, title: 'No Filter'},
                  ...dropdownSortItems
                ].map(item => (
                  <DropdownMenuItemComponent
                    key={item.eventKey}
                    itemId="applySearchField"
                    itemEventKey={item.eventKey}
                    itemTitle={item.title}
                    itemFunc={(eventKey, event) => handleEvent(event, eventKey)}
                  />
                ))}
                ;
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={6}>
            <Form id="applySearchValue" onSubmit={event => handleEvent(event)}>
              <Form.Row>
                <Form.Group as={Col} md={8}>
                  <Form.Control type="string" />
                </Form.Group>
                <Form.Group as={Col} md={1}>
                  <Button type="submit" style={{backgroundColor: '#036'}}>
                    Filter
                  </Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SearchTableLayoutComponent;
